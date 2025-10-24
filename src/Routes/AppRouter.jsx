import { Navigate, Route, Routes } from "react-router";
import Home from "../Components/Screens/Home/Home"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="" element={<Navigate to="home" />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default AppRouter