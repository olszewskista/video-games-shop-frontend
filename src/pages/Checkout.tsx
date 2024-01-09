import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useUser } from '../context/UserProvider';
import useFetch from '../hooks/useFetch';
import FeedbackModal from '../components/FeedbackModal';

type ModalHandles = {
    open: () => void;
    close: () => void;
};

type Game = {
    _id: string;
    title: string;
    price: number;
    description: string;
    image: string;
};

type ModalData = {
    title: string;
    content: string;
    isPositive: boolean;
    onClick?: () => void;
};

export default function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('balance');
    const [discount, setDiscount] = useState({
        code: '',
        value: 0,
    });
    const [modalData, setModalData] = useState<ModalData>({
        title: '',
        content: '',
        isPositive: true,
        onClick: () => {}
    });
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const { data } = useFetch<Game>(
        { _id: '', title: '', price: 0, description: '', image: '' },
        'http://localhost:3000/games/' + params.gameId
    );
    const modalRef = useRef<ModalHandles>();
    const canAfford = !((user?.balance ?? 0) <= (data?.price ?? 0));
    async function handleDiscount() {
        try {
            const response = await fetch(
                'http://localhost:3000/auth/discount/' + discount.code
            );
            if (!response.ok) {
                throw new Error('Code not found');
            }
            const resData = await response.json();
            setDiscount((prev) => ({ ...prev, value: resData.discount / 100 }));
        } catch (error) {
            setDiscount((prev) => ({ ...prev, value: 0 }));
        }
    }
    async function handleBuy(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:3000/games/' + params.gameId + '/buy',
                {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        payment: paymentMethod,
                        price: (
                            data?.price ? data.price * (1 - discount.value) : 0
                        ).toFixed(2),
                    }),
                }
            );
            const resData = await response.json();
            if (!response.ok) {
                throw new Error(resData);
            }
            setModalData({
                title: 'Game bought!',
                content: 'Your order id: ' + resData.id,
                isPositive: true,
                onClick: () => {navigate('/library')}
            });
            modalRef.current?.open();
        } catch (error) {
            setModalData({
                title: 'Failed to buy game!',
                content: (error instanceof Error) ? error.message : 'Unknown error!',
                isPositive: false,
                onClick: () => {}
            });
            modalRef.current?.open()
        }
    }
    return (
        <>
            <FeedbackModal
                ref={modalRef}
                title={modalData.title}
                isPositive={modalData.isPositive}
                content={modalData.content}
                onClick={modalData.onClick}
            />
            <div className="flex flex-col items-center justify-center gap-6 bg-neutral-800 mt-8 py-8 rounded-2xl">
                <h1 className="text-3xl uppercase font-bold">Checkout</h1>
                <div>
                    <h3 className="text-center mb-4">You are trying to buy:</h3>
                    <p>
                        <img
                            src={data?.image}
                            alt={data?.title}
                            className="inline w-12 mr-2"
                        />
                        {data?.title}
                    </p>
                    {!data?.price ||
                        (discount.value === 0 && (
                            <p className="text-center">{data?.price}$</p>
                        ))}
                    {data?.price && discount.value > 0 && (
                        <p className="text-center">
                            <span className="line-through mr-2 text-red-500">
                                {data.price}$
                            </span>
                            <span className="text-green-500">
                                {(data.price * (1 - discount.value)).toFixed(2)}
                                $
                            </span>
                        </p>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="discount"
                        id="discount"
                        placeholder="Promo Code"
                        className="mr-2 text-black"
                        value={discount.code}
                        onChange={(e) =>
                            setDiscount((prev) => ({
                                ...prev,
                                code: e.target.value,
                            }))
                        }
                    />
                    <button type="button" onClick={handleDiscount}>
                        Apply
                    </button>
                </div>
                <h3>Your billing inforamtion:</h3>
                <div className="flex gap-4">
                    <div>
                        <p>ID: {user?._id}</p>
                        <p>Username: {user?.username}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                    <div>
                        <p>Street: {user?.address?.street}</p>
                        <p>
                            City: {user?.address?.postCode}{' '}
                            {user?.address?.city}
                        </p>
                        <p>Country: {user?.address?.country}</p>
                    </div>
                    <div>
                        <p>Card Owner: {user?.creditCard?.owner}</p>
                        <p>Number: {user?.creditCard?.number}</p>
                        <div className="flex justify-between">
                            <p>
                                Expire: {user?.creditCard?.expireMonth}/
                                {user?.creditCard?.expireYear}
                            </p>
                            <p>CVV: {user?.creditCard?.cvv}</p>
                        </div>
                    </div>
                </div>
                <Link to={'/profile'}>
                    <button className="">Edit</button>
                </Link>
                <select
                    name="payment"
                    id="payment"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="bg-neutral-700 p-1 rounded"
                >
                    <option value="balance">Balance</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="transfer">Bank Transfer</option>
                </select>
                {paymentMethod === 'balance' && (
                    <p>
                        Your new balance:{' '}
                        <span
                            className={
                                canAfford ? 'text-green-500' : 'text-red-500'
                            }
                        >
                            {(
                                (user?.balance ?? 0) - (data?.price ?? 0)
                            ).toFixed(2)}
                            $
                        </span>
                    </p>
                )}
                {!canAfford && paymentMethod === 'balance' && (
                    <p className="text-red-500">
                        You can not afford this game!
                    </p>
                )}
                <div className="flex gap-4">
                    <button
                        type="button"
                        disabled={paymentMethod === 'balance' && !canAfford}
                        onClick={handleBuy}
                        className="bg-green-500 px-4 py-1 rounded text-white text-xl"
                    >
                        {paymentMethod === 'balance'
                            ? 'Buy'
                            : paymentMethod === 'creditCard'
                            ? 'Authorize card'
                            : 'Proceed to bank site'}
                    </button>
                    <Link to={'..'}>
                        <button className="bg-red-500 px-4 py-1 rounded text-xl">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
