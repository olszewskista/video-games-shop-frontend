import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';
import Modal from '../components/Modal';
import { useUser } from '../context/UserProvider';

type ModalHandles = {
    open: () => void;
    close: () => void;
};

export default function Checkout() {
    const {user} = useUser()
    const modalRef = useRef<ModalHandles>();
    const params = useParams();
    async function handleBuy(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:3000/games/' + params.gameId + '/buy',
                {
                    method: 'post',
                    headers: {
                        'Application-type': 'application/json',
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
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Modal
                ref={modalRef}
                title="Confirm purchase"
                handleYes={handleBuy}
            >
                Are you sure?
            </Modal>
            <div>
                <h1>Checkout</h1>
                <div>
                    <select name="payment" id="payment">
                        <option value="balance">Balance</option>
                        <option value="creditCard">Credit Card</option>
                    </select>
                </div>
                <p>Your new </p>
                <div>
                    <button
                        type="button"
                        onClick={() => modalRef.current?.open()}
                    >
                        Confirm
                    </button>
                    <Link to={'..'}>
                        <button>Cancel</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
