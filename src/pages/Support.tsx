import { useState } from 'react';
import CreateTicketForm from '../components/CreateTicketForm';
import TicketDetails from '../components/TicketDetails';
import TicketsList from '../components/TicketsList';
import useFetch from '../hooks/useFetch';

type Ticket = {
    title: string;
    messages: { message: string; sender: 'admin' | 'user' }[];
    _id: string;
}

export default function SupportPage() {
    const { data, setData } = useFetch<Ticket[] | null>(
        null,
        'http://localhost:3000/tickets'
    );
    const [currentTicket, setCurrentTicket] = useState<number | null>(0);
    // console.log(data);
    return (
        <div className="flex gap-12">
            <div className='flex flex-col gap-4'>
                {data && (data.length > 0) && (
                    <>
                        <button className={'bg-neutral-700 px-4 py-2 rounded'} onClick={() => setCurrentTicket(0)}>
                            Create a ticket
                        </button>
                        <h3 className='text-center'>Your tickets</h3>
                        <TicketsList
                            tickets={data}
                            onTicketClick={setCurrentTicket}
                        />
                    </>
                )}
            </div>
            {!currentTicket && <CreateTicketForm updateTickets={setData} />}
            {data && (currentTicket !== 0 && (currentTicket !== null)) && <TicketDetails ticket={data[currentTicket - 1]} sender={'user'}/>}
        </div>
    );
}
