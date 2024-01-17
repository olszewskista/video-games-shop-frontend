import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

type Ticket = {
    title: string;
    messages: { message: string; sender: 'admin' | 'user' }[];
    _id: string;
    status: 'open' | 'closed';
};

export default function TicketDetails({
    ticket,
    sender,
}: {
    ticket: Ticket;
    sender: 'admin' | 'user';
}) {
    const [messages, setMessages] = useState(ticket.messages);
    useEffect(() => {
        setMessages(ticket.messages);
    }, [ticket]);
    const formik = useFormik({
        initialValues: {
            message: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch(
                    'http://localhost:3000/tickets/' + ticket._id,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'token'
                            )}`,
                        },
                        body: JSON.stringify({
                            message: values.message,
                            sender: sender,
                        }),
                    }
                );
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                const data = await response.json();
                setMessages((prev) => [...prev, data]);
                toast.success('Message sent!');
                actions.resetForm();
            } catch (error) {
                if (error instanceof Error) toast.error(error.message);
                else toast.error('Updating user failed!');
            }
        },
    });
    async function handleStatusChange() {
        try {
            const response = await fetch(
                'http://localhost:3000/tickets/status/' + ticket._id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            toast.success('Status changed!');
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else toast.error('Updating user failed!');
        }
    }
    return (
        <div className="bg-neutral-800 p-4 rounded h-fit flex-1">
            <h2 className="text-2xl font-bold uppercase text-center mb-4">
                {ticket.title}
            </h2>
            <ul className="overflow-y-auto h-96">
                {messages.map((message, ix) => (
                    <li
                        key={ix}
                        className={`mb-2 flex ${
                            message.sender === 'admin'
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <span
                            className={`max-w-[50%] p-1 rounded-sm ${
                                message.sender === 'admin'
                                    ? 'bg-red-500/50'
                                    : 'bg-blue-600/50'
                            }`}
                        >
                            {message.message}
                        </span>
                    </li>
                ))}
            </ul>
            <form
                onSubmit={formik.handleSubmit}
                className={`flex ${sender === 'admin' ? 'justify-end' : ''}`}
            >
                {sender === 'admin' && (
                    <button
                        className="rounded mr-2 p-1"
                        type="button"
                        onClick={handleStatusChange}
                    >
                        Mark as {ticket.status === 'closed' ? 'open' : 'closed'}
                    </button>
                )}
                <input
                    type="text"
                    {...formik.getFieldProps('message')}
                    className="w-1/2"
                />
                <button className={'ml-2 text-white'} type="submit">
                    Send
                </button>
            </form>
            <ToastContainer position="bottom-right" theme="light" />
        </div>
    );
}
