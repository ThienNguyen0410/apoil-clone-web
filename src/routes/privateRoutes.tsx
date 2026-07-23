import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Dashboard/Profile'


export const privateRoutes = [
    {
        path: '/dashboard',
        element: <Dashboard />
    },

    {
        path: '/',
        element: <Dashboard />
    },

    {
        path: '/profile',
        element: <Profile />
    }

    
]