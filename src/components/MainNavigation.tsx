import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { useUser } from '../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useLogout from '../hooks/useLogout';

const navClassFunc = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? 'text-blue-500 text-base md:text-3xl font-bold underline underline-offset-8'
        : 'text-white md:text-3xl font-bold hover:text-blue-500';

export default function MainNavigation() {
    const token = useRouteLoaderData('root');
    const { user } = useUser();
    const handleLogout = useLogout();

    const isTokenValid = token !== 'EXPIRED' && token !== null;
    return (
        <nav className="bg-neutral-800 p-4 flex justify-between md:text-">
            <ul className="flex gap-8 items-center">
                <li>
                    <img src="https://storage.googleapis.com/games-store/logo2.jpg" alt="logo" className='w-14 rounded-full'/>
                </li>
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
                {isTokenValid && (
                    <>
                        <li>
                            <NavLink to={'/profile'} className={navClassFunc}>
                                PROFILE
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className='text-white text-3xl font-bold hover:bg-transparent hover:text-blue-500'>LOGOUT</button>
                        </li>
                    </>
                )}
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
            {isTokenValid && (
                <div className="flex gap-4 items-center">
                    <div className="text-2xl">
                        <FontAwesomeIcon icon={'user'} className="mr-2" />
                        {user?.username}
                    </div>
                    <div className="text-2xl">
                        <FontAwesomeIcon
                            icon={'dollar-sign'}
                            className="mr-2"
                        />
                        {user?.balance}
                    </div>
                </div>
            )}
        </nav>
    );
}
