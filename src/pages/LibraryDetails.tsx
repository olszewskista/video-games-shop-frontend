import { useRouteLoaderData, useParams } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Game = 
    {
        _id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        category: string;
        __v: number;
    }

export default function LibraryDetailsPage() {
    const library = useRouteLoaderData('library') as Game[] | [];
    const params = useParams()
    const game = library.find((game) => game._id === params.gameId)
    return <>
    <ToastContainer position="bottom-right" theme="light"/>
    {!game && <div>Game info is loading</div>}
    {game && <div className="flex flex-wrap justify-center bg-neutral-800 gap-8 mr-8 mt-8 p-8 rounded-xl">
        <img src={game?.image} alt={game?.title} className="max-w-72 h-fit rounded-xl"/>
        <div className="pr-8 w-fit flex-1 flex flex-col items-center">
            <h1 className="text-3xl uppercase font-bold">{game?.title}</h1>
            <div className="mt-8">{game.description}</div>
            <button onClick={() => toast('Download started!')} className="px-4 py-2 bg-green-500 rounded text-xl mt-12">Download</button>
        </div>
    </div>}
    
    </>
}