type Ticket = {
    title: string;
    messages: { message: string; sender: 'admin' | 'user' }[];
    _id: string;
}

export default function TicketsList({ tickets, onTicketClick }: {tickets: Ticket[], onTicketClick: React.Dispatch<React.SetStateAction<number | null>>}) {
    return (
        <ul className="bg-neutral-800 p-2 rounded flex flex-col gap-4 overflow-auto h-[65vh]">
            {tickets.map((ticket, ix) => (
                <li key={ticket._id} className={'p-2 bg-neutral-700 rounded'}>
                    <button onClick={() => onTicketClick(ix + 1)}>{ticket.title}</button>
                </li>
            ))}
        </ul>
    );
}