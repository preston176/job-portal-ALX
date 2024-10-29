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
import { useEffect, useState } from "react"
import { AuthContext } from "./context/AuthContext"
import MyApplications from "./pages/MyApplications"
import CompanyLogin from "./pages/CompanyLogin"
import CompanySignup from "./pages/CompanySignUp"
import Dashboard from "./pages/Dashboard"
import CompanyProfile from "./pages/CompanyProfile"

const App = () => {
  const [auth, setAuth] = useState(null);


  useEffect(() => {
    const storedAuth = localStorage.getItem('authUser');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

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
              {auth && (<Route path="/myapplications" element={<MyApplications applicantEmail={auth?.email} />} />)}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
        
          {/* Administrative routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/company/addjob" element={<AddJob />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/signup" element={<CompanySignup />} />

        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
    </BrowserRouter >
  )
}

export default App