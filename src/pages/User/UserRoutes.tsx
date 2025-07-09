import { type RouteObject } from "react-router-dom";
import UserPage from './UserPage.tsx';
import UserKYCPage from './UserKYCPage.tsx';
import UserProfilePage from './UserProfilePage.tsx';

const userRoutes: RouteObject[] = [
    {
        path: 'users',
        element: <UserPage/>,
        children: [
            { path: ':id/kyc', element: <UserKYCPage/> },
            { path: ':id/edit', element: <UserProfilePage/> },
            { path: ':id/details', element: <UserProfilePage/> }
        ]
    }
]

export default userRoutes;