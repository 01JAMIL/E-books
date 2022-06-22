import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { Footer } from './components/Footer';
import { SignIn } from './components/Signin';
import { SignUp } from './components/Signup';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Navigate to="/home" replace />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
