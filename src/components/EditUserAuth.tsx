import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';
type UserAuth = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function EditUserAuth() {
    const {user} = useUser();
    console.log(user?.username, user?.email)
    const formik = useFormik({
        initialValues: {
            username: user?.username || '',
            email: user?.email || '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values: UserAuth) {
        console.log(values)
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: values.username,
                email: values.email,
                password: values.password,
            }),
        });
        const resData = await response.json();
        console.log(resData)
    }
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
