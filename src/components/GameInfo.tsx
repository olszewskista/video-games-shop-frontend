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
        <div className="w-96 p-4 bg-neutral-800 rounded-xl m-4 h-fit">
            <img src={game.image} alt={game.title} />
            <h1 className="text-2xl uppercase font-bold">{game.title}</h1>
            <div className="flex justify-between">
                <Link to={'checkout'}>
                    <button className="bg-yellow-300 text-white border-black border-2 px-4 text-xl font-bold rounded">
                        BUY
                    </button>
                </Link>
                <div className="text-xl font-bold">{game.price}$</div>
            </div>
            <div>Release date: {new Date(game.releaseDate).toLocaleDateString()}</div>
            <div>{game.description}</div>
            <div>Views: {Math.floor(game.views)}</div>
        </div>
    );
}
