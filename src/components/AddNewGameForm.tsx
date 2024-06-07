import { useKeycloak } from '@react-keycloak/web';
import { useFormik } from 'formik';
import { useState, useRef } from 'react';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


type Game = {
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    releaseDate: Date;
}

export default function AddNewGameForm() {
    const {keycloak} = useKeycloak();
    const [file, setFile] = useState<Game | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            image: '',
            category: '',
            releaseDate: `${new Date().getFullYear()}-01-01`,
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:3000/games/add', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + keycloak.token,
                    },
                    body: file ? JSON.stringify(file) : JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                actions.resetForm();
                toast.success('Game added!');
            } catch (error) {
                if (error instanceof Error) toast(error.message);
                else toast.error('Adding game failed!');
            }
        },
    });
    function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
        const filereader = new FileReader();
        if (!e.target.files) return;
        filereader.readAsText(e.target.files[0], 'UTF-8');
        filereader.onload = (e) => {
            if (!e.target) return;
            setFile(JSON.parse(e.target.result?.toString() || ''));
        };
        
    }
    function handleClear() {
        setFile(null);
        if (!fileRef.current) return;
        fileRef.current.value = '';
    }
    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2 bg-neutral-800 p-8 rounded-xl'>
            <ToastContainer position='bottom-right' theme='light'/>
            <div className='flex flex-col text-center'>
                <label htmlFor="title">Title</label>
                <input id={'title'} type="text" {...formik.getFieldProps('title')}/>
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="description">Description</label>
                <textarea id="description" cols={30} rows={2} {...formik.getFieldProps('description')}></textarea>
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="price">Price</label>
                <input id='price' type="number" {...formik.getFieldProps('price')}/>
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="image">Image URL</label>
                <input id={'image'} type="text" {...formik.getFieldProps('image')}/>
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="category">Category</label>
                <input id={'category'} type="text" {...formik.getFieldProps('category')}/>
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="releaseDate">Release Date</label>
                <input id={'releaseDate'} type="date" {...formik.getFieldProps('releaseDate')}/>
            </div>
            <button type="submit" className='text-white bg-neutral-700 rounded py-1'>Add</button>
            <div>
                <input type="file" name="import" id="import" onChange={handleImport} ref={fileRef}/>
                <button type='button' onClick={handleClear}>Clear</button>
            </div>
        </form>
    );
}
