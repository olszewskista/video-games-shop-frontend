import GamesList from "../components/GamesList";

export default function StorePage() {
    return <>
    <div>Store</div>
    <GamesList games={['game1', 'game2']}/>
    </>
}