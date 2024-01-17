import { useParams } from 'react-router-dom';
import GameInfo from '../components/GameInfo';
import GameReviews from '../components/GameReviews';
import useFetch from '../hooks/useFetch';

export default function GameDetailsPage() {
    const params = useParams();
    const {data: game} = useFetch(null, 'http://localhost:3000/games/' + params.gameId);
    return (
        <>
            {!game && <div>Game info is loading</div>}
            {game && (
                <div className='flex flex-wrap justify-center'>
                    <GameInfo game={game}/>
                    <GameReviews />
                </div>
            )}
        </>
    );
}
