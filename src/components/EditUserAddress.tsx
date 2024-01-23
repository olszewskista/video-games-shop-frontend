import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';
import * as Yup from 'yup';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type UserAddress = {
    street: string;
    postCode: string;
    city: string;
    country: string;
};

const labelClasses = 'mr-4';
const inputClasses = 'mb-2';

export default function EditUserAddress() {
    const { user, dispatch } = useUser();
    const formik = useFormik({
        initialValues: {
            street: user?.address?.street || '',
            postCode: user?.address?.postCode || '',
            city: user?.address?.city || '',
            country: user?.address?.country || '',
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            street: Yup.string()
                .min(4, 'Street name too short!')
                .required('Street name is required'),
            postCode: Yup.string()
                .length(6, 'Post code must be 6 characters long!')
                .required('Post code is required'),
            city: Yup.string()
                .min(3, 'City name is too short!')
                .required('City name is required'),
            country: Yup.string()
                .min(3, 'Country name is too short!')
                .required('Country is required'),
        }),
    });

    async function handleSubmit(values: UserAddress) {
        try {
            const response = await fetch(
                'http://localhost:3000/user/update/address',
                {
                    method: 'put',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        street: values.street,
                        postCode: values.postCode,
                        city: values.city,
                        country: values.country,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const resData = await response.json();
            dispatch({ type: 'LOGIN', payload: resData });
            toast.success('Address updated!')
        } catch (error) {
            if (error instanceof Error) toast(error.message);
            else toast.error('Address update failed!')
        }
    }
    return (
        <div className="bg-neutral-800 self-center p-4 mt-4 rounded-xl">
            <ToastContainer position='bottom-right'/>
            <form onSubmit={formik.handleSubmit} className='self-center p-4 rounded-xl flex flex-col'>
                <div className='flex flex-col'>
                    <label htmlFor="street" className={labelClasses}>
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        className={inputClasses}
                        {...formik.getFieldProps('street')}
                    />
                    {formik.touched.street && formik.errors.street && (
                        <div className='text-red-500'>{formik.errors.street}</div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="postCode" className={labelClasses}>
                        Post code
                    </label>
                    <input
                        type="text"
                        id="postCode"
                        className={inputClasses}
                        {...formik.getFieldProps('postCode')}
                    />
                    {formik.touched.postCode && formik.errors.postCode && (
                        <div className='text-red-500'>{formik.errors.postCode}</div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="city" className={labelClasses}>
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        className={inputClasses}
                        {...formik.getFieldProps('city')}
                    />
                </div>
                {formik.touched.city && formik.errors.city && (
                    <div className='text-red-500'>{formik.errors.city}</div>
                )}
                <div className='flex flex-col'>
                    <label htmlFor="country" className={labelClasses}>
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        className={inputClasses}
                        {...formik.getFieldProps('country')}
                    />
                    {formik.touched.country && formik.errors.country && (
                        <div className='text-red-500'>{formik.errors.country}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-neutral-700 rounded mt-2"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
