import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type Game = 
    {
        _id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        releaseDate: string;
        views: number;
    }

export default function GameInfo({ game }: {game: Game}) {
    return (
        <div className="w-96 p-4 bg-neutral-800 rounded-xl m-4 h-fit flex flex-col gap-4">
            <img src={game.image} alt={game.title} />
            <h1 className="text-3xl uppercase font-bold text-center">{game.title}</h1>
            <div className="flex justify-between items-center">
                <Link to={'checkout'}>
                    <button className="bg-green-500 text-white px-6 py-2 text-2xl font-bold rounded hover:bg-green-700">
                        BUY
                    </button>
                </Link>
                <div className="text-2xl font-bold">{game.price}$</div>
            </div>
            <div className="flex justify-around">
                <div>
                <FontAwesomeIcon icon={'calendar-days'} />{' '}
                {new Date(game.releaseDate).toLocaleDateString()}
                </div>
                <div><FontAwesomeIcon icon={'eye'} /> {Math.floor(game.views)}</div>
            </div>
            <div>{game.description}</div>
        </div>
    );
}
