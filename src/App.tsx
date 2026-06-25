// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Dashboard from './pages/Dashboard/dashboard'
// import Profile from './pages/Dashboard/profile'
// import Login from './pages/auth/login'
// import {store} from './presenters/store'
// import { Provider } from 'react-redux'
// import PrivateLayout from './pages/Layout/privateLayout'
// import PublicLayout from './pages/Layout/publicLayout'
// import { publicRoutes } from './routes/publicRoutes'
// import { privateRoutes } from './routes/privateRoutes'

// import './App.css'

// function App() {
//   return (
//     <>
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//             <Route path="/dashboard" element={<Dashboard/>}></Route>
//             <Route path="/profile" element={<Profile/>}></Route>
//             <Route path="/login" element={<Login/>}></Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//     </>
//   )
// }

// export default App



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateLayout from './pages/Layout/privateLayout'
import PublicLayout from './pages/Layout/publicLayout'
import { publicRoutes } from './routes/publicRoutes'
import { privateRoutes } from './routes/privateRoutes'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
         {publicRoutes.map((route) => (
          <Route
            key = {route.path}
            path = {route.path}
            element = {
              <PublicLayout>
                {route.element}
              </PublicLayout>
            }
            >
          </Route>
         ))}

         {privateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element= {
              <PrivateLayout>
                {route.element}
              </PrivateLayout>
            }
            >
          </Route>
         ))}

         <Route path="*" element={<div style={{textAlign: 'center', padding: 100, fontSize: 24}}>404 - Trang không tồn tại</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

