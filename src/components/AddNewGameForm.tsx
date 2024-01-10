import { useFormik } from 'formik';

export default function AddNewGameForm() {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            image: '',
            category: '',
            releaseDate: `${new Date().getFullYear()}-01-01`,
        },
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:3000/games/add', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify(values),
                });
                const resData = await response.json();
                console.log(resData)
                alert('git')
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" {...formik.getFieldProps('title')}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" cols={30} rows={2} {...formik.getFieldProps('description')}></textarea>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" {...formik.getFieldProps('price')}/>
            </div>
            <div>
                <label htmlFor="image">Image URL</label>
                <input type="text" {...formik.getFieldProps('image')}/>
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input type="text" {...formik.getFieldProps('category')}/>
            </div>
            <div>
                <label htmlFor="releaseDate">Release Date</label>
                <input type="date" {...formik.getFieldProps('releaseDate')}/>
            </div>
            <button type="submit">Add</button>
        </form>
    );
}
