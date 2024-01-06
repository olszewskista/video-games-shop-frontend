import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

type FormValues = { title: string; description: string; rating: number };


export default function ReviewForm() {
    const params = useParams();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            rating: 0,
        },
        onSubmit: handleSubmit,
    });

    function handleSubmit(values: FormValues) {
        console.log(values)
        async function sendReview() {
            const response = await fetch(
                'http://localhost:3000/reviews',
                {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        gameId: params.gameId,
                        title: values.title,
                        description: values.description,
                        rating: values.rating,
                    }),
                }
            );
            console.log(response)
            const resData = await response.json();
            console.log(resData);
        }
        sendReview()
    }

    return (
        <form onSubmit={formik.handleSubmit} className="p-4">
            <div className="flex flex-col max-w-lg">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    className='rounded-md'
                    {...formik.getFieldProps('title')}
                />
            </div>
            <div className="flex flex-col mb-3 yell">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    cols={30}
                    rows={10}
                    className='rounded-xl'
                    {...formik.getFieldProps('description')}
                ></textarea>
            </div>
            <div className="">
                <div className='text-white'>Star rating</div>
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={
                                index <= formik.values.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-400'
                            }
                            onClick={() =>
                                formik.setFieldValue('rating', index)
                            }
                        >
                            <span className="text-3xl">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <button
                type="submit"
                className="border-black border-2 px-6 py-2 bg-green-300 rounded-xl"
            >
                Send Review
            </button>
        </form>
    );
}
