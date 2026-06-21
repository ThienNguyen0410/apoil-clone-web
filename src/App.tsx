import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/dashboard'

import './App.css'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
