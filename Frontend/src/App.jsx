import { Route, Routes } from "react-router-dom"
import { Navbar } from "./Components/Navbar"
import LoginCustomer from "./Pages/Login"
import RegisterCustomer from "./Pages/Register"
import { Home } from "./Pages/Home"

function App() {

  return (
    <>
      <Navbar/>

      <Routes>

        <Route path="/" element={<LoginCustomer/>} />
        <Route path="/register" element={<RegisterCustomer/>} />
        <Route path="/home" element={<Home/>} />

      </Routes>
    </>
  )
}

export default App
