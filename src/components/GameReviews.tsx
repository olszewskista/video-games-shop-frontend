import ReviewForm from './ReviewForm';
import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import { useParams } from 'react-router-dom';

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
    const [reviews, setReviews] = useState<Review[] | null>(null); // Initialize with an empty array
    useEffect(() => {
        async function fetchReviews() {
            const response = await fetch('http://localhost:3000/reviews/' + gameId);

            if (!response.ok) {
                console.log('error');
                return;
            }

            const resData = await response.json();
            console.log(resData);
            setReviews(resData);
        }
        fetchReviews();
    }, [gameId])
    return (
        <div className="m-4 bg-neutral-800 flex-1 max-w-md">
            <ReviewForm setReviews={setReviews}/>
            <ReviewList reviews={reviews}/>
        </div>
    );
}
