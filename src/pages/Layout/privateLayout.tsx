import { Navigate } from 'react-router-dom'

export default function PrivateLayout({children}: any) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>{children}</>
  )
}
