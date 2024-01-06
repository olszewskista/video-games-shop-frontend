import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';
import * as Yup from 'yup';
type UserAddress = {
    street: string;
    postCode: string;
    city: string;
    country: string;
};

const labelClasses = 'mr-4';
const inputClasses = 'border-2 border-black px-2 py-1 mb-2 rounded';

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
            const resData = await response.json();
            console.log(resData);
            dispatch({ type: 'LOGIN', payload: resData });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="bg-neutral-800 self-center p-4 mt-4 rounded-xl">
            <form onSubmit={formik.handleSubmit} className='self-center bg-neutral-700/50 p-4 mt-4 rounded-xl'>
                <div>
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
                        <div>{formik.errors.street}</div>
                    )}
                </div>
                <div>
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
                        <div>{formik.errors.postCode}</div>
                    )}
                </div>
                <div>
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
                    <div>{formik.errors.city}</div>
                )}
                <div>
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
                        <div>{formik.errors.country}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="border-2 border-white px-6 py-2 text-white"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
