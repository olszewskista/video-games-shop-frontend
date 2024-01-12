import FakeGamesList from '../components/FakeGamesList';
import FavoriteGames from '../components/FavoriteGames';
import GamesFilterOptions from '../components/GamesFilterOptions';
import GamesList from '../components/GamesList';
import useFetch from '../hooks/useFetch';

export default function StorePage() {
    const {data, isLoading, setData, error} = useFetch(null, 'http://localhost:3000/games')
    return (
        <>
            <GamesFilterOptions setGames={setData}/>
            {data && <FavoriteGames games={data}/>}
            <h1 className='text-3xl text-white text-center mb-4 uppercase font-bold'>Shop</h1>
            {isLoading && <FakeGamesList />}
            {data && <GamesList games={data} />}
            {error && <div className='text-white text-center text-2xl'>Fetching games went wrong!</div>}
        </>
    );
}
