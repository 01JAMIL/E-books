import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StepOneForm } from './StepOneForm'
import { StepThreeForm } from './StepThreeForm'
import { StepTwoForm } from './StepTwoForm'

export const SignUp = () => {

  const [verified, setVerified] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    birthday: '',
    login: '',
    password: ''
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }



  return (
    <>
      <div className="sign-container flex justify-center">
        {!verified ? <div className="container-content mt-4">
          <div className="rounded border border-2 p-1">
            <div className="text-3xl text-center p-2">Sign up</div>
            {
              step === 1 &&

              <StepOneForm
                form={form}
                setForm={setForm}
                nextStep={nextStep}
              />
            }

            {
              step === 2 &&

              <StepTwoForm
                form={form}
                setForm={setForm}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            }


            {
              step === 3 &&

              <StepThreeForm
                form={form}
                setForm={setForm}
                prevStep={prevStep}
                setVerified={setVerified}
              />
            }

            <div className="flex justify-center px-1">
              <small>
                You have an account? <Link to="/signin" className="hover:underline">Sign in</Link>
              </small>

            </div>
          </div>
        </div> :

          <div className="mt-20 h-72 w-96 bg-green-400 rounded drop-shadow-md">
              <div className="text-center text-white mt-6 text-2xl font-bold">
                  Email verified successfully!
              </div>
              <div className="flex justify-center items-center h-full -mt-10 text-8xl">
              <i className="fa-solid fa-circle-check text-white fa-beat"></i>
              </div>
          </div>
        }
      </div>
    </>
  )
}
