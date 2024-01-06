import { NavLink, Outlet } from 'react-router-dom';
export default function ProfileRootLayout() {
    return (
        <div className="flex">
            <ul className="w-1/3">
                <li>
                    <NavLink
                        to={'/profile'}
                        className={({ isActive }) =>
                            isActive ? 'text-red-500' : ''
                        }
                        end
                    >
                        Profile Details
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'/profile/orders'}
                        className={({ isActive }) =>
                            isActive ? 'text-red-500' : ''
                        }
                    >
                        Order history
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'/profile/support'}
                        className={({ isActive }) =>
                            isActive ? 'text-red-500' : ''
                        }
                    >
                        Support
                    </NavLink>
                </li>
            </ul>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}
