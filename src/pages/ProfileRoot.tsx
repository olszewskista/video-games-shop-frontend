import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Outlet } from 'react-router-dom';

const liClasses = 'mx-8 text-xl mb-2'

export default function ProfileRootLayout() {
    return (
        <div className="flex gap-4">
            <ul className="md:w-max w-1/4 bg-neutral-800 h-[90vh] rounded-br-3xl pt-8">
                <li className={liClasses}>
                    <NavLink
                        to={'/profile'}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500 underline' : ''
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
                            isActive ? 'text-blue-500 underline' : ''
                        }
                    >
                        <FontAwesomeIcon icon={'shopping-bag'} className='mr-2'/>
                        Order history
                    </NavLink>
                </li>
                <li className={liClasses}>
                    <NavLink
                        to={'/profile/support'}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-500 underline' : ''
                        }
                    >
                        <FontAwesomeIcon icon={'headset'} className='mr-2'/>
                        Support
                    </NavLink>
                </li>
            </ul>
            <div className="flex-1 m-4">
                <Outlet />
            </div>
        </div>
    );
}
