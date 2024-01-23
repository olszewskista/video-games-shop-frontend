import { Link, useLocation } from 'react-router-dom';

export default function ErrorPage() {
    const { pathname } = useLocation();
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-4 justify-center items-center bg-neutral-800 p-16 rounded-lg'>
                <h1 className='text-3xl uppercase font-bold text-red-400'>Error 404</h1>
                <div>Page {pathname} not found!</div>
                <Link to={'/'} className='w-full'>
                    <button className='w-full py-2 rounded bg-neutral-700'>Go back</button>
                </Link>
            </div>
        </div>
    );
}
