import { Link } from "react-router-dom";

export default function Checkout() {
    return <div>
        <button>Confirm</button>
        <Link to={'..'}>
            <button>Cancel</button>
        </Link>
    </div>
}