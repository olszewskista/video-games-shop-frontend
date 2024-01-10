import AddNewGameForm from '../components/AddNewGameForm';
import ManageUsers from '../components/ManageUsers';

export default function AdminTools() {
    return (
        <div className='flex justify-evenly flex-wrap gap-2'>
            <AddNewGameForm />
            <ManageUsers />
        </div>
    );
}
