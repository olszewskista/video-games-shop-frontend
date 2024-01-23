import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';

type Ticket = {
    title: string;
    messages: { message: string; sender: 'admin' | 'user' }[];
    _id: string;
    status: 'open' | 'closed';
}

export default function CreateTicketForm({ updateTickets } : { updateTickets: React.Dispatch<React.SetStateAction<Ticket[] | null>>}) {
    const formik = useFormik({
        initialValues: {
            title: '',
            message: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:3000/tickets/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                updateTickets(prev => {
                    if (prev === null) return [data];
                    else return [...prev, data]
                });
                toast.success('Ticket created!');
                actions.resetForm();
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
                else toast.error('Updating user failed!');
            }
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 p-4 bg-neutral-800 h-fit flex-1'>
                <div className='flex flex-col'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title'{...formik.getFieldProps('title')}/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" cols={30} rows={3} {...formik.getFieldProps('message')}></textarea>
                </div>
                <button type='submit' className='text-white py-2 px-2 rounded bg-neutral-700'>Submit</button>
            </form>
            <ToastContainer position="bottom-right" theme="light" />
        </>
    );
}
