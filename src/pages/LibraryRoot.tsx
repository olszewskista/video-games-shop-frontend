import { NavLink, Outlet, useRouteLoaderData } from 'react-router-dom';

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
    const library = useRouteLoaderData('library') as Library | [];
    return (
        <div className="flex gap-8">
            <ul className="md:w-max w-1/4 h-[85vh] bg-neutral-800 pt-4 px-8 rounded-br-3xl">
                {library.map((game) => (
                    <li key={game._id} className='mt-4 flex'>
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
                {library.length === 0 && <p>No games in library</p>}
            </ul>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
}
