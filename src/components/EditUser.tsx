import { useFormik } from 'formik';
import useFetch from '../hooks/useFetch';

type UserInfo = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function EditUser() {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: UserInfo) {}
    return (
        <form>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    {...formik.getFieldProps('username')}
                />
            </div>
        </form>
    );
}
