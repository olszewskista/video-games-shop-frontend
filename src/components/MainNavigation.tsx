import { NavLink, useRouteLoaderData } from 'react-router-dom';

const navClassFunc = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-blue-500' : 'text-white';

export default function MainNavigation() {
    const token = useRouteLoaderData('root')

    const isTokenValid = token !== 'EXPIRED' && token !== null
    return (
        <nav className="bg-blue-900 p-4">
            <ul className="flex gap-4">
                <li>
                    <NavLink to={'/'} end className={navClassFunc}>
                        Store
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/library'} className={navClassFunc}>
                        Library
                    </NavLink>
                </li>
                {isTokenValid && <li>
                    <NavLink to={'/profile'} className={navClassFunc}>
                        Profile
                    </NavLink>
                </li>}
                {!isTokenValid && (
                    <>
                        <li>
                            <NavLink to={'/login'} className={navClassFunc}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'} className={navClassFunc}>
                                Register
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
