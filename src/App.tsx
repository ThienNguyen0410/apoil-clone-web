import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateLayout from './pages/Layout/privateLayout'
import PublicLayout from './pages/Layout/publicLayout'
import { publicRoutes } from './routes/publicRoutes'
import { privateRoutes } from './routes/privateRoutes'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './presenters/store'
import {Provider} from 'react-redux'
import { store } from './presenters/store'

import './App.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

export default App

