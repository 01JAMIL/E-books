import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

export const Navbar = ({ loggedIn, setLoggedIn }) => {
    const [active, setActive] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    const getUserData = async () => {
        const token = localStorage.getItem('userToken')
        if (token) {
            await axios.get('/api/user/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setUser(res.data)
                setUserName(res.data.firstName + ' ' + res.data.lastName)
            })
        }
    }

    useEffect(() => {
        getUserData()
    }, [loggedIn]);


    const openNav = () => {
        setActive(!active)
    }

    const logout = () => {
        localStorage.removeItem('userToken')
        setLoggedIn(false)
        navigate('/')
    }

    return (
        <nav className="navbar drop-shadow-md flex justify-between items-center py-2 px-2">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="logo" className="object-cover border-2 border-yellow-300/50 p-1 drop-shadow-md rounded h-20" />
                </Link>

            </div>

            <Link to='#' className="bars px-2 cursor-pointer" onClick={openNav}>
                <i className={`fa-solid ${active ? 'fa-xmark' : 'fa-bars'} fa-xl`}></i>
            </Link>

            <div className={`navbar-items ${active && 'active'} flex items-center`}>

                <ul className="navbar-list-items flex">
                    <Link to="/home">
                        <li className="navbar-list-item rounded min-w-150 m-1 hover:bg-slate-100">
                            Home
                        </li>
                    </Link>
                    {!loggedIn ?
                        <>
                            <Link to="/signin">
                                <li className="navbar-list-item rounded min-w-150 m-1  h-11 border border-yellow-400 hover:border-yellow-300">
                                    Signin
                                </li>
                            </Link>
                            <Link to="/signup">
                                <li className="navbar-list-item rounded min-w-150 m-1 h-11 bg-yellow-400 hover:bg-yellow-300">
                                    Signup
                                </li>
                            </Link>
                        </> :

                        <>
                            <div onClick={() => setDropdown(!dropdown)}>
                                <li className="navbar-list-item rounded min-w-150 m-1 h-11 hover:text-yellow-300">
                                    {userName ? userName : ''} <i className={`fa-solid ${!dropdown ? 'fa-caret-down' : 'fa-caret-up'}`}></i>
                                </li>

                                {dropdown &&
                                    <div
                                        className="absolute right-6 p-2 bg-white drop-shadow-md border"
                                        style={{ minWidth: '150px' }}>
                                        <Link to="/profile">
                                            <div className="rounded w-auto hover:bg-slate-200/50 p-2 mb-3">
                                                <i className="fa-solid fa-circle-user fa-lg mr-1"></i> Profile
                                            </div>
                                        </Link>
                                        <hr />
                                        <div className="rounded w-auto mt-3">
                                            <button className="w-full h-10 hover:bg-slate-100" onClick={logout}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>}
                            </div>
                        </>
                    }
                </ul>

            </div>


        </nav >
    )
}
