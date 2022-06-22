import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { validateStepTwoForm } from '../validation/RegisterFormValidation'
export const StepTwoForm = ({ form, setForm, nextStep, prevStep }) => {

    const [names, setNames] = useState([])
    const [formErrors, setErrors] = useState({})
    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validForm = () => {
        const { errors, valid } = validateStepTwoForm(form)
        if (!valid) {
            setErrors(errors)
        } else {
            nextStep()
        }
    }

    useEffect(() => {
        const getCountriesNames = () => {
            var countriesNames = []
            for (let i in countries) {
                countriesNames.push(countries[i].name)
            }
            setNames(countriesNames.sort((a, b) => {
                if (a > b) return 1
                if (a < b) return -1
                return 0
            }))
        }

        getCountriesNames()
    }, [])

    return (
        <>
            <div className="px-2 h-full">
                <span className="block text-sm font-medium text-slate-700 mb-2">Email</span>
                <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      invalid:border-pink-500 invalid:text-pink-600"
                    value={form.email}
                    onChange={changeHandler}
                />
                <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.emailError && 'invisible'}`}>
                    {formErrors.emailError}
                </p>
            </div>

            <div className="px-2 h-full">
                <span className="block text-sm font-medium text-slate-700 mb-2">Phone</span>
                <input
                    type="tel"
                    name="phone"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    value={form.phone}
                    onChange={changeHandler}
                />
                <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.phoneError && 'invisible'}`}>
                    {formErrors.phoneError}
                </p>
            </div>

            <div className="px-2 h-full">
                <span className="block text-sm font-medium text-slate-700 mb-2">Country</span>
                <input
                    list="countries"
                    name="country"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    value={form.country}
                    onChange={changeHandler} />
                <datalist id="countries">
                    {
                        names.map(c => (
                            <option key={c} value={c} />
                        ))
                    }
                </datalist>
                <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!formErrors.countryError && 'invisible'}`}>
                    {formErrors.countryError}
                </p>
            </div>

            <div className="flex justify-between px-1 mb-3">
                <button className="rounded m-1 p-2 bg-yellow-400 hover:bg-yellow-300" onClick={() => prevStep()}>
                    <i className="fa-solid fa-angle-left"></i> previous
                </button>
                <button type="submit" className="rounded m-1 p-2 bg-yellow-400 hover:bg-yellow-300" onClick={validForm}>
                    next <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </>
    )
}
