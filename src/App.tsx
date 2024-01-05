import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { storeLoader, libraryLoader, tokenLoader } from './utils/loaders';
import RootLayout from './pages/Root';
import StorePage from './pages/Store';
import LibraryPage from './pages/Library';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import GameDetailsPage from './pages/GameDetails';
import { UserProvider } from './context/UserProvider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        id: 'root',
        loader: tokenLoader,
        children: [
            { index: true, element: <StorePage />, loader: storeLoader },
            { path: ':gameId', element: <GameDetailsPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: 'library',
                element: <LibraryPage />,
                loader: libraryLoader,
            },
            {
                path: 'profile',
                children: [{ index: true, element: <ProfilePage /> }],
            },
        ],
    },
]);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />;
        </UserProvider>
    );
}

export default App;
