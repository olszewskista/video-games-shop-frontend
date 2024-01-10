import { useFormik } from 'formik';

export default function GamesFilterOptions({
    setGames,
}: {
    setGames: React.Dispatch<React.SetStateAction<null>>;
}) {
    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            sort: '',
        },
        onSubmit: async (values) => {
            const response = await fetch(
                `http://localhost:3000/games/filter?title=${values.title}&category=${values.category}&sort=${values.sort}`
            );
            const resData = await response.json();
            setGames(resData);
        },
    });
    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-neutral-900 to-neutral-700/80 my-8 p-8 rounded-xl gap-4">
            <h1 className="text-3xl font-bold uppercase">Apply your filters</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center gap-4 mb-4">
                    <label htmlFor="title">Search for your game</label>
                    <input
                        type="text"
                        id="title"
                        className="p-2 rounded"
                        {...formik.getFieldProps('title')}
                    />
                    <button
                        type="submit"
                        className="text-white px-4 py-2 bg-neutral-700 rounded"
                    >
                        Apply
                    </button>
                </div>
                <div className="flex justify-between">
                    <select id="category" className='p-2 rounded' {...formik.getFieldProps('category')}>
                        <option value="">Category</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="casual">Casual</option>
                        <option value="indie">Indie</option>
                        <option value="multiplayer">Multiplayer</option>
                        <option value="racing">Racing</option>
                        <option value="rpg">RPG</option>
                        <option value="simulation">Simulation</option>
                        <option value="sports">Sports</option>
                        <option value="strategy">Strategy</option>
                    </select>
                    <select id="sort" className='p-2 rounded' {...formik.getFieldProps('sort')}>
                        <option value="">Sort by</option>
                        <option value="title_1">Alphabetical</option>
                        <option value="title_-1">Reverse Alphabetical</option>
                        <option value="price_1">Price</option>
                        <option value="price_-1">Reverse Price</option>
                        <option value="releaseDate_-1">Newest</option>
                        <option value="releaseDate_1">Oldest</option>
                        <option value="views_-1">Most Popular</option>
                        <option value="views_1">Least Popular</option>
                    </select>
                </div>
            </form>
        </div>
    );
}
