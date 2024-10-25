import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import Jobs from "./pages/Jobs"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Apply from "./pages/Apply"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="bg-gray-100 min-h-screen p-4">
        <Routes>
          {/* Homepage Route */}
          <Route element={<Homepage />} path="/" />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/apply/:jobId" element={<Apply />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App