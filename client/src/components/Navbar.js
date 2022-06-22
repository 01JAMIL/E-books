import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';


export const Navbar = () => {
    const [active, setActive] = useState(false)

    const openNav = () => {
        setActive(!active)
    }
    return (
        <nav className="navbar drop-shadow-md flex justify-between items-center py-2 px-2">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="logo" className="object-cover border-2 border-yellow-300/50 p-1 drop-shadow-md rounded h-20" />
                </Link>

            </div>

            <a href='#' className="bars px-2 cursor-pointer" onClick={openNav}>
                <i className={`fa-solid ${active ? 'fa-xmark' : 'fa-bars'} fa-xl`}></i>
            </a>

            <div className={`navbar-items ${active && 'active'} flex items-center`}>

                <ul className="navbar-list-items flex">
                    <Link to="/home">
                        <li className="navbar-list-item rounded min-w-150 m-1 hover:bg-slate-100">
                            Home
                        </li>
                    </Link>
                    <Link to="/signin">
                        <li className="navbar-list-item rounded min-w-150 m-1 border-2 border-yellow-400 hover:border-yellow-300">
                            Signin
                        </li>
                    </Link>
                    <Link to="/signup">
                        <li className="navbar-list-item rounded min-w-150 m-1 bg-yellow-400 hover:bg-yellow-300">
                            Signup
                        </li>
                    </Link>
                </ul>

            </div>


        </nav>
    )
}
