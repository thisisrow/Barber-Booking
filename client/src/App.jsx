import Navbar from "./Pages/Navbar"
import FrountPage from "./Pages/FrountPage"
import Admin from "./Pages/Admin"
import Login from "./Pages/Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FrountPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App