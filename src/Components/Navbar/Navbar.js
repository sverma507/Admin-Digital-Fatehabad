import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate =useNavigate();
    const go_menu=()=>{navigate('/Menu');}
    const go_addcategory=()=>{navigate('/AddCategory');}

  return (
    <>
        <div className='admin-outer'>
            <div className='admin-logo'>Admin Pannel</div>
            <div className='nav-items'>
                <div className='nav-item' onClick={go_menu}>ADD MENU ITEMS</div>
                <div className='nav-item' onClick={go_addcategory}>ADD CATEGORY</div>
            </div>
        </div>
    </>
  )
}

export default Navbar
