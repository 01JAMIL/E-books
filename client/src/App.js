import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { SignIn } from './components/Signin';
import { SignUp } from './components/Signup';
import { useEffect, useState } from 'react';


function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(false)

    const verifyToken = () => {
      const token = localStorage.getItem('userToken')
      if (token)
        setLoggedIn(true)
    }

    verifyToken()
  }, [loggedIn])

  return (
    <>
      <Router>
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
