
import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './layout/MainPage'
import Profile from './pages/Profile'
import FoundorLostForm from './pages/FoundorLostForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/foundorlost" element={<FoundorLostForm />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
