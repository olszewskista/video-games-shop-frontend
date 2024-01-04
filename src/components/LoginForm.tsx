import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    email: string;
    password: string;
};

type Feedback = {
    error?: string,
    success?: boolean
}

export default function LoginForm() {
    const [feedback, setFeedback] = useState<Feedback>({})
    const navigate = useNavigate()
    async function handleSubmit(values: FormValues) {
        setFeedback({})
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            })
        })
        const resData = await response.json()

        if (!response.ok) {
            setFeedback({error: resData.error})
            return
        }
        console.log(resData.token)
        sessionStorage.setItem('token', resData.token)
        setFeedback({success: true})
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }
    const initialValues: FormValues = { email: '', password: '' };
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
    });
    return (<>
        <form
            onSubmit={formik.handleSubmit}
            className="p-4 flex flex-col gap-4 bg-blue-400 w-fit m-auto"
        >
            <div>
                <label htmlFor="email" className='pr-4'>email</label>
                <input type="email" id='email'{...formik.getFieldProps('email')} />
            </div>
            <div>
                <label htmlFor="password" className='pr-4'>password</label>
                <input type="password" id='password'{...formik.getFieldProps('password')} />
            </div>
            <button type="submit" className='w-fit' disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
        {feedback.error && <div className='text-center text-red-600'>{feedback.error}</div>}
        {feedback.success && <div className='text-center text-green-600'>Login successfull!</div>}
    </>
    );
}