import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

type Library = [
    {
        _id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        category: string;
        __v: number;
    }
];

export default function LibraryRootLayout() {
    const library = useLoaderData() as Library | [];
    return (
        <div className="flex gap-8">
            <ul className="w-max h-[90vh] bg-neutral-800 pt-4 px-8 rounded-br-3xl">
                {library.map((game) => (
                    <li key={game._id}>
                        <NavLink
                            to={game._id}
                            className={({ isActive }) =>
                                isActive ? 'text-blue-500' : ''
                            }
                        >
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-12 inline mr-4 rounded"
                            />
                            <span>{game.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
