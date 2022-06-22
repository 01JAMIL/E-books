import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const SignIn = () => {

  const [show, setShow] = useState(false)

  const closeAlert = () => {
    setShow(!show)
  }

  return (
    <>
      <div className="sign-container flex justify-center p-2">
        <div className="container-content">
          <div className="h-20 flex justify-center items-end mb-2">
            {show &&
              <div className="alert flex justify-between items-center h-14 border border-1 border-red-200/50 rounded w-full bg-red-200">
                <div className="px-2 text-red-800">
                  <strong><i className="fa-solid fa-circle-exclamation fa-lg"></i></strong><span className="px-2">Email or password invalid...</span>
                </div>
                <div className="px-2 rounded">
                  <i className="fa-solid fa-xmark fa-lg cursor-pointer" onClick={closeAlert}></i>
                </div>
              </div>}
          </div>
          <form className="rounded border border-2 p-1">
            <div className="text-3xl text-center p-2">Log in</div>
            <div className="px-2 h-full mt-8">
              <span className="block text-sm font-medium text-slate-700 mb-2">Email</span>
              <input type="email" name="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      invalid:border-pink-500 invalid:text-pink-600"
              />
              <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Error text
              </p>
            </div>

            <div className="px-2 h-full">
              <span className="block text-sm font-medium text-slate-700 mb-2">Password</span>
              <input type="password" name="password" className="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Error text
              </p>
            </div>

            <div className="flex justify-center px-1 mb-3">
              <button type="submit" className="rounded w-full m-1 p-2 bg-yellow-400 hover:bg-yellow-300">
                Log in
              </button>
            </div>

            <div className="flex justify-center px-1">
              <small>
                Don't have an account? <Link to="/signup" className="hover:underline">Sign up</Link>
              </small>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}
