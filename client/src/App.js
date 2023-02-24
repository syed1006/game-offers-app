import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateOffer from "./components/Create/CreateOffer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar"
import NewProduct from "./components/NewProduct/NewProduct";
import Products from "./components/Products/Products";
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

                        <Route element={<RequireAuth allowedRoles={['admin', 'player'] }/>}>
                            <Route path='/' element={<Home />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={['admin'] }/>}>
                            <Route path='/createOffer' element={<CreateOffer/>} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={['admin'] }/>}>
                            <Route path='/createProduct' element={<NewProduct/>} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={['admin'] }/>}>
                            <Route path='/products' element={<Products/>} />
                        </Route>
                    </Routes>
                </AuthState>
            </BrowserRouter>
        </div>
    )
}

export default App;