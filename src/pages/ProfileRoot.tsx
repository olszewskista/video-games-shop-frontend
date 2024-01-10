import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

const liClasses = 'mx-8 text-xl mb-6 uppercase font-bold w-fit'

export default function ProfileRootLayout() {
    const {user} = useUser()
    return (
        <div className="flex gap-4">
            <ul className="md:w-max w-1/4 bg-neutral-800 h-[90vh] rounded-br-3xl pt-8">
                <li className={liClasses}>
                    <NavLink
                        to={'/profile'}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500 ' : 'py-2'
                        }
                        end
                    >
                        <FontAwesomeIcon icon={'user'} className='mr-2'/>
                        Profile Details
                    </NavLink>
                </li>
                <li className={liClasses}>
                    <NavLink
                        to={'/profile/orders'}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500 ' : 'py-2'
                        }
                    >
                        <FontAwesomeIcon icon={'shopping-bag'} className='mr-2'/>
                        Order History
                    </NavLink>
                </li>
                <li className={liClasses}>
                    <NavLink
                        to={'/profile/support'}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500 ' : 'py-2'
                        }
                    >
                        <FontAwesomeIcon icon={'headset'} className='mr-2'/>
                        Support
                    </NavLink>
                </li>
                {user?.isAdmin && <li className={liClasses}>
                    <NavLink
                        to={'/profile/admin'}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500 ' : 'py-2'
                        }
                    >
                        <FontAwesomeIcon icon={'toolbox'} className='mr-2'/>
                        Admin Tools
                    </NavLink>
                </li>}
            </ul>
            <div className="flex-1 m-4">
                <Outlet />
            </div>
        </div>
    );
}
