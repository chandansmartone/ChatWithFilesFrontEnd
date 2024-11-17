import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'; // Import the close icon
import { useNavigate } from 'react-router-dom';
import NewFileButtonheader from '../../Utils/NewFileButtonHeader/NewFileButtonheader';
const Header = ({username,handleNewFileReq}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogOut=()=>{
        localStorage.removeItem('access_token')
        onClick=setIsOpen(false)
        navigate('/login')

    }

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <h1>ChatWithFiles</h1>
                </div>
                
                <nav className={`nav-links ${isOpen ? "open" : ""}`}>
                    <button className="nav-close" onClick={toggleMenu}>
                        <IoClose />
                    </button>
            
                    <div onClick={handleNewFileReq}>
                    <NewFileButtonheader/>
                    </div>
                    <div className="user-profile">
                        <div className="user">
                        <FaUserCircle className="user-icon" />
                        <span>{username}</span>
                        </div>
                   
                    <Link onClick={handleLogOut}>Logout</Link>
                </div>
                </nav>
                <button className="menu-icon" onClick={toggleMenu}>
                    <FaBars />
                </button>
            </div>
        </header>
    );
};

export default Header;
