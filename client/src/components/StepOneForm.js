import React, { useState } from 'react'
import { validateStepOneForm } from '../validation/RegisterFormValidation'

export const StepOneForm = ({ form, setForm, nextStep }) => {

    const [formErrors, setErrors] = useState({})

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validForm = () => {
        const { errors, valid } = validateStepOneForm(form)
        if (!valid) {
            setErrors(errors)
        } else {
            nextStep()
        }
    }

    return (
        <>
            <div className="px-2 h-full mt-6">
                <span className="block text-sm font-medium text-slate-700 mb-2">First name</span>
                <input
                    type="text"
                    name="firstName"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      invalid:border-pink-500 invalid:text-pink-600"
                    value={form.firstName}
                    onChange={changeHandler}
                />
                <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.firstNameError && 'invisible'}`}>
                    {formErrors.firstNameError}
                </p>
            </div>

            <div className="px-2 h-full">
                <span className="block text-sm font-medium text-slate-700 mb-2">Last name</span>
                <input
                    type="text"
                    name="lastName"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      invalid:border-pink-500 invalid:text-pink-600"
                    value={form.lastName}
                    onChange={changeHandler}
                />
                <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.lastNameError && 'invisible'}`}>
                    {formErrors.lastNameError}
                </p>
            </div>

            <div className="px-2 h-full">
                <span className="block text-sm font-medium text-slate-700 mb-2">Birthday</span>
                <input
                    type="date"
                    name="birthday"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      invalid:border-pink-500 invalid:text-pink-600"
                    value={form.birthday}
                    onChange={changeHandler}
                />
                <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.birthdayError && 'invisible'}`}>
                    {formErrors.birthdayError}
                </p>
            </div>

            <div className="flex justify-end px-1 mb-3">
                <button className="rounded m-1 p-2 bg-yellow-400 hover:bg-yellow-300" onClick={validForm}>
                    next <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </>
    )
}
