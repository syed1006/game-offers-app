import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar"
import Register from "./components/Register/Register";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AuthState from "./context/Auth/AuthState";

const App = () => {
    return (
        <div className="main-container">
            <BrowserRouter>
                <AuthState>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<RequireAuth role="admin" />}>
                            <Route path='/' element={<Home />} />
                        </Route>
                    </Routes>
                </AuthState>
            </BrowserRouter>
        </div>
    )
}

export default App;