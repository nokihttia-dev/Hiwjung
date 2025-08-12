import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import homeLogo from '../../assets/homelogo.svg';
import searchIcon from '../../assets/searchicon.svg';
import avatar from '../../assets/avatar.png'


const Navbar = ({user,setUser}) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/SignIn') 
  };

    const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
const [searchTerm, setSearchTerm] = useState("");

const handleSearch = () => {
  if (searchTerm.trim()) {
    navigate(`/searchrecipes?query=${encodeURIComponent(searchTerm.trim())}`);
  }
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src={homeLogo}
            alt="Home"
            id="logo"
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

<div className="navbar-right">
  <div className='searchbox'>
    <input
      type="discovertext"
      placeholder='discover recipe'
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <img
      src={searchIcon}
      alt=""
      className='searchlogo'
      style={{ cursor: 'pointer' }}
      onClick={handleSearch}
    />
  </div>

        {user ? (
          <div className="user-info">

              <span className="user-email" >
                {user.email}
              </span>
            
            <img style={{ cursor: 'pointer' }}  onClick={toggleDropdown}
              src={avatar}
              alt="User"
              className="user-avatar"
            />
            <button onClick={handleLogout}>Logout</button>
             {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                <Link to="/myrecipe" onClick={() => setShowDropdown(false)}>myRecipes</Link>
              </div>
            )}
          </div>

          
        ) : (
          <>
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
            <Link to="/signUp">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
