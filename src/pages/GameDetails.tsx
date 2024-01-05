import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameInfo from '../components/GameInfo';
import GameReviews from '../components/GameReviews';

export default function GameDetailsPage() {
    const params = useParams();
    const [game, setGame] = useState(null);
    useEffect(() => {
        async function fetchGame() {
            const response = await fetch(
                'http://localhost:3000/games/' + params.gameId
            );

            if (!response.ok) {
                console.log('error');
                return;
            }

            const resData = await response.json();
            console.log(resData);
            setGame(resData);
        }
        fetchGame();
    }, [params]);
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
