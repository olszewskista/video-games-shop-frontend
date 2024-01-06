import { NavLink, useRouteLoaderData } from 'react-router-dom';

const navClassFunc = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-blue-500 text-2xl font-bold underline' : 'text-white text-2xl font-bold';


    
export default function MainNavigation() {
    const token = useRouteLoaderData('root')

    const isTokenValid = token !== 'EXPIRED' && token !== null
    return (
        <nav className="bg-neutral-800 p-4">
            <ul className="flex gap-4">
                <li>
                    <NavLink to={'/'} className={navClassFunc}>
                        STORE
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/library'} className={navClassFunc}>
                        LIBRARY
                    </NavLink>
                </li>
                {isTokenValid && <li>
                    <NavLink to={'/profile'} className={navClassFunc}>
                        PROFILE
                    </NavLink>
                </li>}
                {!isTokenValid && (
                    <>
                        <li>
                            <NavLink to={'/login'} className={navClassFunc}>
                                LOGIN
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'} className={navClassFunc}>
                                REGISTER
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
