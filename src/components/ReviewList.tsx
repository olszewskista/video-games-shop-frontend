type Reviews =
    | {
          _id: string;
          title: string;
          description: string;
          rating: number;
          gameId: string;
          author: { _id: string; username: string };
      }[]
    | null;

export default function ReviewList({ reviews }: { reviews: Reviews }) {
    return (
        <>
            {!reviews && <div>Reviews are loading...</div>}
            {reviews && (
                <>
                    {reviews.length !== 0 && <div className="text-center">
                        Average rating:{' '}
                        {(
                            reviews.reduce((acc, item) => {
                                return acc + item.rating;
                            }, 0) / reviews.length
                        ).toFixed(2)}{' '}
                        / 5
                    </div>}
                    <ul className="p-4 h-[32rem] overflow-y-auto ">
                        {reviews.map((review) => (
                            <li
                                key={review._id}
                                className="bg-neutral-700/60 rounded-xl p-4 mb-4"
                            >
                                <div className="text-center uppercase font-bold text-2xl">
                                    {review.title}
                                </div>
                                <div className="whitespace-pre">
                                    {review.description}
                                </div>
                                <div className="text-end">
                                    {[...Array(5)].map((_, index) => {
                                        index += 1;
                                        return (
                                            <span
                                                key={index}
                                                className={`text-3xl ${
                                                    index <= review.rating
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                &#9733;
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="text-end">
                                    - {review.author.username}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
