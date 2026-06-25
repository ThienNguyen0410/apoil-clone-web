import {Navigate } from 'react-router-dom'
import { useAppSelector } from '../../presenters/hooks';
export default function PublicLayout({children}: any) {
    const token = localStorage.getItem('accessToken');
    const {isAuthenticated} = useAppSelector((state) => state.auth);
    if (isAuthenticated && token) {
        return <Navigate to="/dashboard" replace />;
    }   

  return (
        <>{children}</>
  )
}





