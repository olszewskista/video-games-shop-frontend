import EditUserAddress from "../components/EditUserAddress";
import EditUserAuth from "../components/EditUserAuth";
import EditUserPayment from "../components/EditUserPayment";

export default function ProfilePage() {
    return (
        <div className="flex">
            <ul className="w-1/3">
                <li><button>Edit user details</button></li>
                <li><button>Order history</button></li>
                <li><button>Support</button></li>
            </ul>
            <div>Current tab
                <EditUserAuth/>
                <EditUserAddress />
                <EditUserPayment />
            </div>
        </div>
    );
}
