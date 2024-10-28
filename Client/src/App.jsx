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
import AddJob from "./pages/AddJob"
import { useState } from "react"
import { AuthContext } from "./context/AuthContext"

const App = () => {
  const [auth, setAuth] = useState();
  console.log(auth)

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Navbar />
        <main className="bg-gray-100 min-h-screen p-4">
          <Routes>
            {/* Homepage Route */}
            <Route element={<Homepage />} path="/" />
            <Route path="/jobs" element={<Jobs />} />
            {auth ? (<Route path="/apply/:jobId" element={<Apply />} />) : (<Route path="/apply/:jobId" element={<Login />} />)}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Administrative routes */}
            <Route path="company/addjob" element={<AddJob />} />
          </Routes>
        </main>
        <Footer />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App