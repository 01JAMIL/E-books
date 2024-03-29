import './App.css'
import { Navbar } from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { Footer } from './components/Footer'
import { SignIn } from './components/Signin'
import { SignUp } from './components/Signup'
import { useEffect, useState } from 'react'
import { AuthorDetails } from './components/AuthorDetails'
import axios from 'axios'
import { VerifyEmail } from './components/VerifyEmail'
import { isExpired } from 'react-jwt'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [connectedUser, setConnectedUser] = useState({})

  const verifyToken = async () => {
    const token = localStorage.getItem('userToken')
    if (token) {
      const expired = isExpired(token)
      //console.log(expired)

      if (expired) {
        localStorage.removeItem('userToken')
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        await axios.get('/api/user/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(res => {
          setConnectedUser(res.data)
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
  useEffect(() => {
    verifyToken()
  }, [loggedIn])

  if (loggedIn && !connectedUser.verified) {
    return <VerifyEmail id={connectedUser._id} />
  }



  return (

    <>
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route exact path='/' element={<Navigate to="/home" replace />} />
        <Route
          path='/home'
          element={
            <HomePage
              loggedIn={loggedIn}
            />
          }
        />
        <Route path='/signin' element={!loggedIn ? <SignIn setLoggedIn={setLoggedIn} /> : <Navigate to='/home' replace />} />
        <Route path='/signup' element={!loggedIn ? <SignUp /> : <Navigate to='/home' replace />} />
        <Route path='/author/:id' element={<AuthorDetails />} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
