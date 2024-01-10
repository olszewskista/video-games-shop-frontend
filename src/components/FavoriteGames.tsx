import { useUser } from '../context/UserProvider';
import GamesList from './GamesList';

type Games = {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}[];

export default function FavoriteGames({ games }: { games: Games }) {
    const { user } = useUser();
    const favoriteGames = games.filter((game) => {
        return user?.favorites?.includes(game._id);
    });

    return (<>
        {favoriteGames.length > 0 && <div className='mb-8'>
            <h1 className='text-center text-2xl font-bold uppercase mb-2'>Your favorite games</h1>
            <GamesList games={favoriteGames} />
        </div>}
    </>
    );
}
