import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/dashboard'
import Profile from './pages/Dashboard/profile'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
