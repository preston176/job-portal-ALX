import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import Jobs from "./pages/Jobs"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Apply from "./pages/Apply"

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
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App