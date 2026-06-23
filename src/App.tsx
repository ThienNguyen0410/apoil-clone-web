import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/dashboard'
import Profile from './pages/Dashboard/profile'
import {store} from './presenters/store'
import { Provider } from 'react-redux'
import './App.css'

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
