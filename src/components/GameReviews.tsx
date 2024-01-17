import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export type Review =
    {
        _id: string;
        title: string;
        description: string;
        rating: number;
        gameId: string;
        author: { _id: string; username: string };
    }

export default function GameReviews() {
    const { gameId } = useParams();
    const {data: reviews, setData: setReviews} = useFetch<Review[] | null>(null, 'http://localhost:3000/reviews/' + gameId)
    return (
        <div className="m-4 bg-neutral-800 flex-1 max-w-md">
            <ReviewForm setReviews={setReviews}/>
            <ReviewList reviews={reviews}/>
        </div>
    );
}
