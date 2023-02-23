import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navbar.css'

const Navbar = ()=>{
    const {auth} = useAuth()
    return(
        <header className='header'>
            <div className="link-container">
                <h1>Offers Paradise</h1>
                <nav className='navbar'>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li>About</li>
                        <li>Contact us</li>
                        {
                            auth.role === 'admin'&&
                        <li><Link to={'/create'}>Create Offer</Link></li>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;