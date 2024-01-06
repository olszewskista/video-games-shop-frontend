import { useState } from "react";
import UserDetails from "../components/UserDetails";
import EditUserAuth from "../components/EditUserAuth";
import EditUserAddress from "../components/EditUserAddress";
import EditUserPayment from "../components/EditUserPayment";

export default function ProfileDetailsPage() {
    const [activeElement, setActiveElement] = useState(0)
    return (
        <div className="flex flex-col">
            <UserDetails setActiveElement={setActiveElement} />
            {activeElement === 1 && <EditUserAuth />}
            {activeElement === 2 && <EditUserAddress />}
            {activeElement === 3 && <EditUserPayment />}
        </div>
    );
}
