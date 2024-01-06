import { Link } from 'react-router-dom';

type Games = [
    {
        _id: string;
        title: string;
        description: string;
        price: number;
        image: string;
    }
];

export default function GamesList({ games }: { games: Games }) {
    return (
        <ul className="flex flex-wrap gap-4 mx-4 justify-center">
            {games.map((game) => {
                return (
                    <li key={game._id} className="w-96 bg-neutral-800 p-6 rounded-xl hover:bg-blue-900">
                        <Link to={game._id}>
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full mb-2"
                            />
                            <div className='flex justify-between'>
                                <div className='text-xl'>{game.title}</div>
                                <div className='text-xl'>{game.price}$</div>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
