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
            console.log(resData)
            setGames(resData)
        }
        fetchGames()
    }, [])
    return (
        <>
            <div>Store</div>
            <GamesFilterOptions />
            {games && <GamesList games={games} />}
            {!games && <div>Loading games...</div>}
        </>
    );
}
