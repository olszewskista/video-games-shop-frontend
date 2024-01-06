import { useFormik } from 'formik';
import { useUser } from '../context/UserProvider';
import * as Yup from 'yup';
type UserPayment = {
    owner: string;
    number: string;
    expireMonth: number;
    expireYear: number;
    cvv: number;
};

const labelClasses = 'mr-4';
const inputClasses = 'border-2 border-black px-2 py-1 mb-2 rounded';

export default function EditUserPayment() {
    const { user, dispatch } = useUser();
    const formik = useFormik({
        initialValues: {
            owner: user?.creditCard?.owner || '',
            number: user?.creditCard?.number || '',
            expireMonth: user?.creditCard?.expireMonth || 0,
            expireYear: user?.creditCard?.expireYear || 0,
            cvv: user?.creditCard?.cvv || 0,
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            owner: Yup.string()
                .min(4, 'Name too short!')
                .required('Card owner is required'),
            number: Yup.string()
                .min(16, 'Card number is too short!')
                .max(16, 'Card number is too long!')
                .required('Card number is required'),
            expireMonth: Yup.number()
                .min(1, 'Month must be between 1 and 12')
                .max(12, 'Month must be between 1 and 12')
                .required('Month is required'),
            expireYear: Yup.number()
                .min(24, 'Year must be between 24 and 40')
                .max(40, 'Year must be between 24 and 40')
                .required('Year is required'),
            cvv: Yup.number()
                .min(100, 'CVV must be 3 digits long')
                .max(999, 'CVV must be 3 digits long')
                .required('CVV is required'),
        }),
    });

    async function handleSubmit(values: UserPayment) {
        try {
            const response = await fetch(
                'http://localhost:3000/user/update/creditCard',
                {
                    method: 'put',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        owner: values.owner,
                        number: values.number,
                        expireMonth: values.expireMonth,
                        expireYear: values.expireYear,
                        cvv: values.cvv,
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
    console.log(formik.values.cvv);
    return (
        <div className="bg-neutral-800 self-center p-4 mt-4 rounded-xl">
            <form onSubmit={formik.handleSubmit} className='self-center bg-neutral-700/50 p-4 mt-4 rounded-xl'>
                <div className="flex flex-col gap-4 px-4 py-8 bg-gradient-to-b from-blue-700 to-blue-800/50 rounded-xl">
                    <div>
                        <input
                            type="text"
                            id="number"
                            placeholder="Card number"
                            className={inputClasses}
                            {...formik.getFieldProps('number')}
                        />
                    </div>
                    <div className="flex gap-10">
                        <div className="flex">
                            <div>
                                <input
                                    type="number"
                                    id="expireMonth"
                                    placeholder="M"
                                    className={inputClasses + ' w-14'}
                                    {...formik.getFieldProps('expireMonth')}
                                />
                            </div>
                            <span className="mx-1 mt-1">/</span>
                            <div>
                                <input
                                    type="number"
                                    id="expireYear"
                                    placeholder="Y"
                                    className={inputClasses + ' w-14'}
                                    {...formik.getFieldProps('expireYear')}
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="number"
                                id="cvv"
                                placeholder="CVV"
                                className={inputClasses + ' w-16'}
                                {...formik.getFieldProps('cvv')}
                            />
                        </div>
                    </div>
                </div>
                {formik.touched.number && formik.errors.number && (
                    <div className='text-red-500/90'>{formik.errors.number}</div>
                )}
                {formik.touched.expireMonth && formik.errors.expireMonth && (
                    <div className='text-red-500/90'>{formik.errors.expireMonth}</div>
                )}
                {formik.touched.expireYear && formik.errors.expireYear && (
                    <div className='text-red-500/90'>{formik.errors.expireYear}</div>
                )}
                {formik.touched.cvv && formik.errors.cvv && (
                    <div className='text-red-500/90'>{formik.errors.cvv}</div>
                )}
                <div>
                    <label htmlFor="owner" className={labelClasses}>
                        Card owner
                    </label>
                    <input
                        type="text"
                        id="owner"
                        className={inputClasses + ' mt-4'}
                        {...formik.getFieldProps('owner')}
                    />
                    {formik.touched.owner && formik.errors.owner && (
                        <div className='text-red-500'>{formik.errors.owner}</div>
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
