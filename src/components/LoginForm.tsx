import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useRevalidator } from 'react-router-dom';
import * as Yup from 'yup';

type FormValues = {
    email: string;
    password: string;
};

type Feedback = {
    error?: string;
    success?: boolean;
};

export default function LoginForm() {
    const [feedback, setFeedback] = useState<Feedback>({});
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    async function handleSubmit(values: FormValues) {
        setFeedback({});
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
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
    const initialValues: FormValues = { email: '', password: '' };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Enter correct email!')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password is too short1')
                .required('Password is required'),
        }),
    });
    return (
        <div className="flex flex-col justify-center items-center h-[85vh]">
            <form
                onSubmit={formik.handleSubmit}
                className="p-8 flex flex-col gap-4 bg-neutral-800 rounded-lg mb-4 max-w-96 w-full"
                
            >
                <div className='flex flex-col'>
                    <label htmlFor="email" className="pr-4">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...formik.getFieldProps('email')}
                        className=''
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className='text-red-500 mt-2 text-sm'>{formik.errors.email}</div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className="pr-4">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className='text-red-500 mt-2 text-sm'>{formik.errors.password}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className=" bg-neutral-700 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {feedback.error && (
                <div className="text-center text-red-600">{feedback.error}</div>
            )}
            {feedback.success && (
                <div className="text-center text-green-600">
                    Login successfull!
                </div>
            )}
        </div>
    );
}
