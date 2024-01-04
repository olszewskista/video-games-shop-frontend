import { NavLink } from "react-router-dom";

const navClassFunc = ({isActive}: {isActive: boolean} ) => isActive ? 'text-blue-500' : 'text-white'

export default function MainNavigation() {
    return <nav className="bg-blue-900 p-4">
        <ul className="flex gap-4">
            <li>
                <NavLink to={'/'} end className={navClassFunc}>Store</NavLink>
            </li>
            <li>
                <NavLink to={'/library'} className={navClassFunc}>Library</NavLink>
            </li>
            <li>
                <NavLink to={'/profile'} className={navClassFunc}>Profile</NavLink>
            </li>
        </ul>
    </nav>
}