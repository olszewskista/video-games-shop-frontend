import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useRevalidator } from 'react-router-dom';
import * as Yup from 'yup';

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type Feedback = {
    error?: string;
    success?: boolean;
};

export default function RegisterForm() {
    const [feedback, setFeedback] = useState<Feedback>({});
    const revalidator = useRevalidator();
    const navigate = useNavigate();
    async function handleSubmit(values: FormValues) {
        setFeedback({});
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
            }),
        });
        const resData = await response.json();

        if (!response.ok) {
            setFeedback({ error: resData.error });
            return;
        }
        console.log(resData.token);
        sessionStorage.setItem('token', resData.token);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        sessionStorage.setItem('expiration', expiration.toISOString());
        setFeedback({ success: true });
        setTimeout(() => {
            revalidator.revalidate();
            navigate('/');
        }, 1000);
    }
    const initialValues: FormValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            username: Yup.string()
                .min(4, 'Name too short!')
                .required('Name is required!'),
            email: Yup.string()
                .email('Enter correct email!')
                .required('Email is required!'),
            password: Yup.string()
                .min(6, 'Password is too short')
                .required('Password is required!'),
            confirmPassword: Yup.string()
                .required('Password is required!')
                .oneOf([Yup.ref('password')], 'Passwords do not match!'),
        }),
    });
    return (
        <div className="flex flex-col h-[85vh] justify-center items-center">
            <form
                onSubmit={formik.handleSubmit}
                className="p-8 flex flex-col gap-4 bg-neutral-800 rounded-lg w-full max-w-96"
            >
                <div className="flex flex-col">
                    <label htmlFor="name" className="pr-4">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...formik.getFieldProps('username')}
                    />
                    {formik.errors.username && formik.touched.username && (
                        <div className="text-red-500 text-sm mt-2">
                            {formik.errors.username}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="pr-4">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className='text-red-500 text-sm mt-2'>{formik.errors.email}</div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="pr-4">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className='text-red-500 text-sm mt-2'>{formik.errors.password}</div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="pr-4">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.errors.confirmPassword &&
                        formik.touched.confirmPassword && (
                            <div className='text-red-500 text-sm mt-2'>{formik.errors.confirmPassword}</div>
                        )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-neutral-700 p-2 rounded hover:bg-blue-600 transition-all duration-300"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {feedback.error && (
                <div className="text-center text-red-600 mt-2">
                    {feedback.error}
                </div>
            )}
            {feedback.success && (
                <div className="text-center text-green-600 mt-2">
                    Register successfull!
                </div>
            )}
        </div>
    );
}
