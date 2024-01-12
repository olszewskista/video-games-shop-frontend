import FakeGamesList from '../components/FakeGamesList';
import FavoriteGames from '../components/FavoriteGames';
import GamesFilterOptions from '../components/GamesFilterOptions';
import GamesList from '../components/GamesList';
import { useEffect, useState } from 'react';

export default function StorePage() {
    const [games, setGames] = useState(null)
    useEffect(() => {
        async function fetchGames() {
            const response = await fetch('http://localhost:3000/games')

            if (!response.ok) {
                console.log('error')
                return
            }

            const resData = await response.json()
            setGames(resData)
        }
        fetchGames()
    }, [])
    return (
        <>
            <GamesFilterOptions setGames={setGames}/>
            <FakeGamesList />
            {games && <FavoriteGames games={games}/>}
            <h1 className='text-3xl text-white text-center mb-4 uppercase font-bold'>Shop</h1>
            {games && <GamesList games={games} />}
            {!games && <div>Loading games...</div>}
        </>
    );
}
