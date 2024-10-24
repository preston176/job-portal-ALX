import Companies from "./components/Companies";
import FindJobs from "./components/FindJobs";
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom"

const Layout = () => {
  const user = true;
  const location = useLocation();

  return user ? <Outlet /> : <Navigate to={"user-auth"} state={{ from: location }} replace />;
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<Layout />} />
        <Route path="/" element={<Navigate to="/find-jobs" replace={true} />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App