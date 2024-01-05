export default function ProfilePage() {
    return (
        <div className="flex">
            <ul className="w-1/3">
                <li><button>Edit user details</button></li>
                <li><button>Order history</button></li>
                <li><button>Support</button></li>
            </ul>
            <div>Current tab</div>
        </div>
    );
}
