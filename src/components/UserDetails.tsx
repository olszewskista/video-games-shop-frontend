import { useUser } from '../context/UserProvider';

export default function UserDetails({
    setActiveElement,
}: {
    setActiveElement: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { user } = useUser();
    return (
        <div className='bg-neutral-800 p-4 rounded-xl'>
            <h1 className="text-center text-2xl uppercase mb-4 font-bold">User details</h1>
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 bg-neutral-700/50 p-4 rounded-xl flex flex-col gap-2">
                    <h2 className="text-center uppercase font-bold text-xl mb-2">Auth</h2>
                    <p>Your id: {user?._id}</p>
                    <p>Username: {user?.username}</p>
                    <p>Email: {user?.email}</p>
                    <p>Admin Account: <span className={user?.isAdmin ? 'text-green-500' : 'text-red-500'}>{user?.isAdmin.toString()}</span></p>
                    <button onClick={() => setActiveElement(1)} className='py-2 rounded bg-neutral-700'>Edit</button>
                </div>
                <div className="flex-1 bg-neutral-700/50 p-4 rounded-xl flex flex-col gap-2">
                    <h2 className="text-center uppercase font-bold text-xl">Address</h2>
                    <p className='capitalize'>Street: {user?.address?.street}</p>
                    <p className='capitalize'>City: {user?.address?.city}</p>
                    <p>Post code: {user?.address?.postCode}</p>
                    <p className='capitalize'>Country: {user?.address?.country}</p>
                    <button onClick={() => setActiveElement(2)} className='py-2 rounded bg-neutral-700'>Edit</button>
                </div>
                <div className="flex-1 bg-neutral-700/50 p-4 rounded-xl flex flex-col gap-2">
                    <h2 className="text-center uppercase font-bold text-xl">Credit Card</h2>
                    <p className='capitalize'>Owner: {user?.creditCard?.owner}</p>
                    <p>Number: {user?.creditCard?.number}</p>
                    <p>Expire month: {user?.creditCard?.expireMonth}</p>
                    <p>Expire year: {user?.creditCard?.expireYear}</p>
                    <p>CVV: {user?.creditCard?.cvv}</p>
                    <button onClick={() => setActiveElement(3)} className='py-2 rounded bg-neutral-700'>Edit</button>
                </div>
            </div>
        </div>
    );
}
