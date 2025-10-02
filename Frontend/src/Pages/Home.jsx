import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

export const Home = () => {

  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const token = Cookies.get("token");
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    
    if (!token || !user) {
      toast.error("Please login to access this page");
      navigate('/');
      return;
    }
    
    setIsAuthenticated(true);
  }, [navigate]);

  // Fetch all notes
  const fetchNotes = async () => {
    const token = Cookies.get("token");
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/notes/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
      } else {
        const result = await response.json();
        toast.error(result.error || "Failed to fetch notes");
      }
    } catch (error) {
      toast.error("Error fetching notes");
    } finally {
      setLoading(false);
    }
  };

  // Create new note
  const createNote = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    const noteData = {
      title: title,
      content: content,
    };

    try {
      const response = await fetch("http://localhost:3000/api/notes/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Note created successfully");
        setNotes([data.Note, ...notes]);
        resetModal();
        fetchNotes(); // Refresh the notes list
      } else {
        const result = await response.json();
        toast.error(result.error);
        if (result.errors) {
          result.errors.map((err) => toast.error(err.msg));
        }
      }
    } catch (error) {
      toast.error("Error creating note");
    }
  };

  // Update note
  const updateNote = async (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    const noteData = {
      title: title,
      content: content,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/notes/update/${currentNote._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Note updated successfully");
        setNotes(notes.map(note => note._id === currentNote._id ? data.Note : note));
        resetModal();
        fetchNotes(); // Refresh the notes list
      } else {
        const result = await response.json();
        toast.error(result.error);
        if (result.errors) {
          result.errors.map((err) => toast.error(err.msg));
        }
      }
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    const token = Cookies.get("token");
    try {
      const response = await fetch(`http://localhost:3000/api/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Note deleted successfully");
        setNotes(notes.filter(note => note._id !== id));
        fetchNotes(); // Refresh the notes list
      } else {
        const result = await response.json();
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  // Reset modal
  const resetModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentNote(null);
    setTitle('');
    setContent('');
  };

  // Open edit modal
  const openEditModal = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setEditMode(true);
    setShowModal(true);
  };

  // Load notes when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
              <p className="text-gray-600 mt-1">Welcome back, {JSON.parse(localStorage.getItem("user"))?.username}! Manage your notes here.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              + Add New Note
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-lg">Loading...</div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    {formatDate(note.createdAt)}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(note)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No notes yet</h3>
                <p className="text-gray-600 mb-4">Create your first note to get started!</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Create Note
                </button>
              </div>
            )
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editMode ? 'Edit Note' : 'Create New Note'}
                </h2>
                <button
                  onClick={resetModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={editMode ? updateNote : createNote}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your note content here..."
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editMode ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
