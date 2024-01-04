export default function GamesList({games}) {
    return <ul>
        {games.map(game => {
            return <li key={game}>{game}</li>
        })}
    </ul>
}