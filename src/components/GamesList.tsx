import { Link } from 'react-router-dom';
import { useUser } from '../context/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Games = {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}[];

export default function GamesList({ games }: { games: Games }) {
    const { user, dispatch } = useUser();
    async function handleAddToFavorites(id: string) {
        try {
            const response = await fetch(
                'http://localhost:3000/user/favorites/'+ id,
                {
                    method: 'post',
                    headers: {
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            dispatch({ type: 'UPDATE_FAVORITES', payload: resData })
            console.log(resData);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ul className="flex flex-wrap gap-4 mx-4 justify-center">
            {games.map((game) => {
                return (
                    <li
                        key={game._id}
                        className="w-96 bg-neutral-800 p-6 rounded-xl hover:bg-blue-900"
                    >
                        <Link to={game._id}>
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full mb-2"
                            />
                            <div className="flex justify-between">
                                <div className="text-xl">{game.title}</div>
                                <div className="text-xl">{game.price}$</div>
                            </div>
                        </Link>
                        <button onClick={() => handleAddToFavorites(game._id)}>
                            <FontAwesomeIcon className='text-xl' icon={user?.favorites?.includes(game._id) ? 'heart-circle-minus' : 'heart-circle-plus'}/>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
