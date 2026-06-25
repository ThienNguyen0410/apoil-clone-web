import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../presenters/hooks';

export default function PrivateLayout({children}: any) {
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  const token = localStorage.getItem('accessToken');
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>{children}</>
  )
}
