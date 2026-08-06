import { Navigate } from 'react-router-dom'
import APSP_Web from '../pages/Dashboard'
import Profile from '../pages/Profile'
import DeviceDetails from '../components/Devices/DeviceDetail'
import DeviceDetailInfo from '../components/Devices/DeviceDetail/Detail'
import TransactionHistory from '../components/Devices/DeviceDetail/TransactionHistory'
import CollectionHistory from '../components/Devices/DeviceDetail/CollectionHistory'
import DeviceRevenue from '../components/Devices/DeviceDetail/Revenue'
import CustomerPage from '../components/Customers'
import UserPage from '../components/System-settings/Users'
import DevicePage from '../components/Devices'
import ErrorPage from '../components/Errors'
import RevenuePage from '../components/Revenue'

export const privateRoutes = [
    {
        path: '/apsp',
        element: <APSP_Web />,
        children: [
            { index: true, element: <Navigate to="/apsp/customers" replace /> },
            { path: "customers", element: <CustomerPage /> },
            { path: "devices", element: <DevicePage /> },
            { path: "user", element: <UserPage /> },

            { 
                path: "device/:id/detail", 
                element: <DeviceDetails />,
                children: [
                    { index: true, element: <DeviceDetailInfo /> },
                    { path: "transaction-history", element: <TransactionHistory /> },
                    { path: "collection-history", element: <CollectionHistory /> },
                    { path: "revenue", element: <DeviceRevenue /> },
                ]
            },
            {path: 'errors', element: <ErrorPage/>},
            {path: 'revenue', element: <RevenuePage/>}
        ]
    },

    {
        path: '/',
        element: <Navigate to="/apsp/customers" replace />
    },

    {
        path: '/profile',
        element: <Profile />
    },
   
]