import { useState } from 'react';
import AddNewGameForm from '../components/AddNewGameForm';
import ManageUsers from '../components/ManageUsers';
import TicketDetails from '../components/TicketDetails';
import TicketsList from '../components/TicketsList';
import useFetch from '../hooks/useFetch';

type Ticket = {
    title: string;
    messages: { message: string; sender: 'admin' | 'user' }[];
    _id: string;
    status: 'open' | 'closed';
}

export default function AdminTools() {
    const { data } = useFetch<Ticket[] | null>(null, 'http://localhost:3000/tickets');
    const [currentTicket, setCurrentTicket] = useState<number | null>(null);

    return (
        <div className="flex flex-wrap gap-12">
            <div className='flex-1 flex basis-full justify-evenly'>
                <div>
                    <h1 className="font-bold uppercase text-3xl text-center mb-2">
                        Add new game
                    </h1>
                    <AddNewGameForm />
                </div>
                <div>
                    <h1 className="font-bold uppercase text-3xl text-center mb-2">
                        Edit user details
                    </h1>
                    <ManageUsers />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="font-bold uppercase text-3xl text-center mb-2">
                    Respond to tickets
                </h1>
                <div className="flex gap-2">
                    {data && (
                        <TicketsList
                            tickets={data}
                            onTicketClick={setCurrentTicket}
                        />
                    )}
                    {currentTicket && data && (
                        <TicketDetails
                            ticket={data[currentTicket - 1]}
                            sender={'admin'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
