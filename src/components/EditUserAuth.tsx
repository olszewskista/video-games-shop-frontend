import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';
import * as Yup from 'yup';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useKeycloak } from '@react-keycloak/web';

type UserAuth = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const labelClasses = 'mr-4';
const inputClasses = 'mb-2';

export default function EditUserAuth() {
    const {keycloak} = useKeycloak();
    const { user, dispatch } = useUser();
    const formik = useFormik({
        initialValues: {
            username: user?.username || '',
            email: user?.email || '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            username: Yup.string()
                .min(4, 'Name too short!')
                .required('Username is required'),
            email: Yup.string()
                .email('Enter correct email!')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password is too short!')
                .matches(
                    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    'Password must include an uppercase letter, a number, and a special character'
                )
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm password is required'),
        }),
    });

    async function handleSubmit(values: UserAuth) {
        try {
            const response = await fetch(
                'http://localhost:3000/user/update/auth',
                {
                    method: 'put',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization:
                            'Bearer ' + keycloak.token,
                    },
                    body: JSON.stringify({
                        username: values.username,
                        email: values.email,
                        password: values.password,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            dispatch({ type: 'LOGIN', payload: resData });
            toast.success('User auth info updated!');
        } catch (error) {
            if (error instanceof Error) toast(error.message);
            else toast.error('Updating user failed!');
        }
    }
    return (
        <div className='bg-neutral-800 self-center p-4 mt-4 rounded-xl'>
            <ToastContainer position='bottom-right' theme='light'/>
            <form
                onSubmit={formik.handleSubmit}
                className="self-center p-4 rounded-xl flex flex-col"
            >
                <div className='flex flex-col'>
                    <label htmlFor="username" className={labelClasses}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className={inputClasses}
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div className='text-red-500'>{formik.errors.username}</div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className={labelClasses}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={inputClasses}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className='text-red-500'>{formik.errors.email}</div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className={labelClasses}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={inputClasses}
                        {...formik.getFieldProps('password')}
                    />
                </div>
                {formik.touched.password && formik.errors.password && (
                    <div className='text-red-500'>{formik.errors.password}</div>
                )}
                <div className='flex flex-col'>
                    <label htmlFor="confirmPassword" className={labelClasses}>
                        Confirm password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className={inputClasses}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <div className='text-red-500'>{formik.errors.confirmPassword}</div>
                        )}
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 text-white rounded bg-neutral-700 mt-2"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
