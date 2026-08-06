import { BrowserRouter, Routes, Route } from 'react-router-dom'
import type { ComponentType, ReactNode } from 'react'
import PrivateLayout from './pages/Layout/privateLayout'
import PublicLayout from './pages/Layout/publicLayout'
import { publicRoutes } from './routes/PublicRoutes'
import { privateRoutes } from './routes/PrivateRoutes'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './presenters/store'
import './App.css'

type RouteConfig = {
  path?: string
  element: ReactNode
  index?: boolean
  children?: RouteConfig[]
}

function renderRoutes(routes: RouteConfig[], Layout: ComponentType<{ children: ReactNode }>) {
  return routes.map((route) => (
    <Route
      key={route.path ?? 'index'}
      path={route.path}
      element={<Layout>{route.element}</Layout>}
    >
      {renderChildRoutes(route.children)}
    </Route>
  ))
}

function renderChildRoutes(children?: RouteConfig[]) {
  if (!children) return undefined

  const indexChild = children.find((c) => c.index)
  const normalChildren = children.filter((c) => !c.index)

  return (
    <>
      {indexChild && <Route index element={indexChild.element} />}
      {normalChildren.map((child) => (
        <Route key={child.path!} path={child.path} element={child.element}>
          {renderChildRoutes(child.children)}
        </Route>
      ))}
    </>
  )
}

function App() {
  return (
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicLayout>{route.element}</PublicLayout>}
            />
          ))}

          {renderRoutes(privateRoutes, PrivateLayout)}

          <Route path="*" element={<div style={{textAlign: 'center', padding: 100, fontSize: 24}}>404 - Trang không tồn tại</div>} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
  )
}

export default App

