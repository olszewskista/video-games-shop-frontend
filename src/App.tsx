import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import StorePage from './pages/Store';
import LibraryPage from './pages/Library';
import ProfilePage from './pages/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <StorePage /> },
            { path: 'library', element: <LibraryPage /> },
            { path: 'profile', element: <ProfilePage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
