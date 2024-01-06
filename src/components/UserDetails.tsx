import { useUser } from "../context/UserProvider";

export default function UserDetails() {
    const {user} = useUser();
    return (
        <div>
            <h1>User details</h1>
        </div>
    );
}