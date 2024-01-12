import { useRef } from 'react';
import FeedbackModal from '../components/FeedbackModal';
import useFetch from '../hooks/useFetch';
import { useUser } from '../context/UserProvider';

type Order = {
    _id: string;
    game: {
        _id: string;
        title: string;
        price: number;
        description: string;
        image: string;
    };
    type: string;
    price: number;
    date: string;
    refundable: boolean;
};

type ModalHandles = {
    open: () => void;
    close: () => void;
};

export default function OrderHistoryPage() {
    const {dispatch} = useUser();
    const positiveModal = useRef<ModalHandles>();
    const negativeModal = useRef<ModalHandles>();
    const { data, isLoading } = useFetch(
        [],
        'http://localhost:3000/user/orders'
    );
    async function handleRefund(id: string) {
        try {
            const response = await fetch(
                'http://localhost:3000/orders/refund/' + id,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            console.log(resData);
            positiveModal.current?.open();
            dispatch({type: 'BUY_GAME', payload: {balance: resData.balance, library: resData.library}})
        } catch (error) {
            negativeModal.current?.open();
        }
    }
    return (
        <>
            <FeedbackModal
                title="Success"
                content="Your order has been refunded"
                isPositive
                ref={positiveModal}
                onClick={() => {}}
            />
            <FeedbackModal
                title="Error"
                content="You can not refund this game"
                isPositive={false}
                ref={negativeModal}
            />
            <div className="p-8 bg-neutral-800 rounded-xl">
                {isLoading && <p>Loading...</p>}
                {data?.length === 0 && <p>No orders</p>}
                {data && (
                    <ul className="flex flex-col gap-4">
                        {data.map((order: Order) => (
                            <li
                                key={order._id}
                                className="flex justify-between items-center flex-wrap"
                            >
                                <div
                                    className={
                                        'flex flex-wrap gap-4 items-center py-2 px-4 rounded ' +
                                        (order.type === 'purchase'
                                            ? 'bg-red-500/50'
                                            : 'bg-green-500/50')
                                    }
                                >
                                    <p>ID: {order._id}</p>
                                    <img
                                        src={order.game.image}
                                        alt={order.game.title}
                                        className="w-12"
                                    />
                                    <p>{order.game.title}</p>
                                    <p>
                                        {order.type === 'purchase' ? '-' : '+'}
                                        {order.price}$
                                    </p>
                                    <p>{new Date(order.date).toUTCString()}</p>
                                </div>
                                {order.refundable && (
                                    <button
                                        onClick={() => handleRefund(order._id)}
                                        className="bg-neutral-700 rounded px-4 py-2 h-fit"
                                    >
                                        Refund
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
