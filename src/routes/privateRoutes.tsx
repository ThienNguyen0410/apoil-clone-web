import Dashboard from '../pages/Dashboard/dashboard'
import Profile from '../pages/Dashboard/profile'


export const privateRoutes = [
    {
        path: '/dashboard',
        element: <Dashboard />
    },

    {
        path: '/profile',
        element: <Profile />
    }
]