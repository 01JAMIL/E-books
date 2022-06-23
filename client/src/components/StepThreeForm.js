import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateStepThreeForm } from '../validation/RegisterFormValidation'
export const StepThreeForm = ({ form, setForm, prevStep }) => {

    const [formErrors, setErrors] = useState({})
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const registerUser = async () => {
        await axios.post('/api/user', form).then(res => {
            navigate('/signin', { replace: true })
        }).catch(err => {
            console.log(err)
        })
    }

    const submitHandler = (e) => {
        setErrors({})
        e.preventDefault()

        const { errors, valid } = validateStepThreeForm(form)
        if (!valid) {
            setErrors(errors)
        } else {
            registerUser()
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="px-2 h-full">
                    <span className="block text-sm font-medium text-slate-700 mb-2">User name</span>
                    <input
                        type="text"
                        name="login"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        value={form.login}
                        onChange={changeHandler}
                    />
                    <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.loginError && 'invisible'}`}>
                        {formErrors.loginError}
                    </p>
                </div>

                <div className="px-2 h-full">
                    <span className="block text-sm font-medium text-slate-700 mb-2">Password</span>
                    <input
                        type="password"
                        name="password"
                        className="peer mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.passwordError && 'invisible'}`}>
                        {formErrors.passwordError}
                    </p>
                </div>

                <div className="flex justify-between px-1 mb-3">
                    <button className="rounded m-1 p-2 bg-yellow-400 hover:bg-yellow-300" onClick={() => prevStep()}>
                        <i className="fa-solid fa-angle-left"></i> previous
                    </button>
                    <button type="submit" className="rounded m-1 p-2 bg-yellow-400 hover:bg-yellow-300">
                        Sign up
                    </button>
                </div>
            </form>
        </>
    )
}
