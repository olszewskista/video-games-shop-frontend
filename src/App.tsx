import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { libraryLoader, tokenLoader, adminLoader, authLoader } from './utils/loaders';
import RootLayout from './pages/Root';
import StorePage from './pages/Store';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import GameDetailsPage from './pages/GameDetails';
import { UserProvider } from './context/UserProvider';
import ProfileRootLayout from './pages/ProfileRoot';
import ProfileDetailsPage from './pages/ProfileDetails';
import OrderHistoryPage from './pages/OrderHistory';
import SupportPage from './pages/Support';
import LibraryRootLayout from './pages/LibraryRoot';
import LibraryDetailsPage from './pages/LibraryDetails';
import Checkout from './pages/Checkout';
import AdminTools from './pages/AdminTools';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        id: 'root',
        loader: tokenLoader,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <StorePage />, loader: authLoader },
            {
                path: ':gameId',
                loader: authLoader,
                children: [
                    { index: true, element: <GameDetailsPage /> },
                    { path: 'checkout', element: <Checkout /> },
                ],
            },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: 'library',
                element: <LibraryRootLayout />,
                id: 'library',
                loader: libraryLoader,
                children: [
                    { path: ':gameId', element: <LibraryDetailsPage /> },
                ],
            },
            {
                path: 'profile',
                element: <ProfileRootLayout />,
                loader: authLoader,
                children: [
                    { index: true, element: <ProfileDetailsPage /> },
                    { path: 'orders', element: <OrderHistoryPage /> },
                    { path: 'support', element: <SupportPage />},
                    { path: 'admin', element: <AdminTools />, loader: adminLoader },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;
