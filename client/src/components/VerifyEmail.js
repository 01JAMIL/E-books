import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactJsAlert from 'reactjs-alert'

export const VerifyEmail = ({ id }) => {

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("Email verified successfully");

    const [codeInput, setCodeInput] = useState({
        id: '',
        code: ''
    })
    const [inputErrors, setInputErrors] = useState({})
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setCodeInput({
            id: id,
            code: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setInputErrors({})
        await axios.post('/api/user/verify-user-email', codeInput).then((res) => {
            setStatus(true)
        }).catch((err) => {
            setInputErrors(err.response.data)
        })
    }


    const sendOtherEmail = async () => {
        await axios.post('/api/user/send-verification-code/' + id).then(res => {
            window.alert('Email sent')
        })
    }

    const closeAndRedirect = () => {
        setStatus(false)
        navigate('/signin')
        window.location.reload()
    }


    return (
        <>
            <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>
                <div className="p-2 w-96">
                    <div className="text-xl mb-10">
                        <h2>Verify your email address to contnue</h2>
                    </div>
                    <form className="mb-6" onSubmit={submitHandler}>
                        <span className="block text-sm font-medium text-slate-700 mb-2">Verification code</span>
                        <input
                            type="text"
                            name="code"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                      invalid:border-pink-500 invalid:text-pink-600"
                            value={codeInput.code}
                            onChange={changeHandler}
                        />
                        <p className={`h-4 my-1 peer-invalid:visible text-pink-600 text-sm ${!inputErrors.error && 'invisible'}`}>
                            {inputErrors.error}
                        </p>

                        <div>
                            <button type='submit' className="rounded mt-6 p-2 bg-yellow-400 hover:bg-yellow-300">
                                Verify
                            </button>
                        </div>
                    </form>
                    <div>
                        <small>Don't receive the code ? <b className="hover:text-slate-400 cursor-pointer" onClick={sendOtherEmail}>send and other</b></small>
                    </div>
                </div>
            </div>
            <ReactJsAlert
                status={status} // true or false
                type={type} // success, warning, error, info
                title={title}
                Close={closeAndRedirect}
            />
        </>
    )
}
