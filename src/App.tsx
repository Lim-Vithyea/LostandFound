
import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './layout/MainPage'

function App() {


  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
