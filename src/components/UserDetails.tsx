import { useUser } from '../context/UserProvider';

export default function UserDetails({
    setActiveElement,
}: {
    setActiveElement: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { user } = useUser();
    return (
        <>
            <h1 className="text-center">User details</h1>
            <div className="flex flex-wrap">
                <div className="flex-1 w-max">
                    <h2 className="text-center">Auth</h2>
                    <p>Your id: {user?._id}</p>
                    <p>Username: {user?.username}</p>
                    <p>Email: {user?.email}</p>
                    <p>Admin Account: <span className={user?.isAdmin ? 'text-green-500' : 'text-red-500'}>{user?.isAdmin.toString()}</span></p>
                    <button onClick={() => setActiveElement(1)}>Edit</button>
                </div>
                <div className="flex-1">
                    <h2 className="text-center">Address</h2>
                    <p>Street: {user?.address?.street}</p>
                    <p>City: {user?.address?.city}</p>
                    <p>Post code: {user?.address?.postCode}</p>
                    <p>Country: {user?.address?.country}</p>
                    <button onClick={() => setActiveElement(2)}>Edit</button>
                </div>
                <div className="flex-1">
                    <h2 className="text-center">Credit Card</h2>
                    <p>Owner: {user?.creditCard?.owner}</p>
                    <p>Number: {user?.creditCard?.number}</p>
                    <p>Expire month: {user?.creditCard?.expireMonth}</p>
                    <p>Expire year: {user?.creditCard?.expireYear}</p>
                    <p>CVV: {user?.creditCard?.cvv}</p>
                    <button onClick={() => setActiveElement(3)}>Edit</button>
                </div>
            </div>
        </>
    );
}
