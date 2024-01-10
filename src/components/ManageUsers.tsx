import { useState, useRef } from 'react';

type User = {
    _id: string;
    username: string;
    email: string;
    balance: number;
    password: string;
    isAdmin: boolean;
};

export default function ManageUsers() {
    const [currUser, setCurrUser] = useState<User | null>(null);
    const [fieldData, setFieldData] = useState({
        key: 'username',
        value: '',
    })
    const usernameRef = useRef<HTMLInputElement>(null);
    async function handleSetUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(
                'http://localhost:3000/user/' + usernameRef.current?.value,
                {
                    method: 'get',
                    headers: {
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                }
            );
            const resData = await response.json();
            if (resData.length === 0) {
                throw new Error('User not found');
            }
            setCurrUser(resData[0]);
        } catch (error) {
            setCurrUser(null);
            alert('User not found');
            console.log(error);
        }
    }
    async function handleDeleteUser() {
        try {
            const response = await fetch(
                'http://localhost:3000/user/' + currUser?._id,
                {
                    method: 'delete',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            alert('user deleted')
            setCurrUser(null);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleSetField() {
        try {
            if (fieldData.value === '') throw new Error('Value cannot be empty')
            const response = await fetch(
                'http://localhost:3000/user/' + currUser?._id,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + sessionStorage.getItem('token'),
                    },
                    body: JSON.stringify({ key: fieldData.key, value: fieldData.value }),
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            alert('field updated')
        } catch (error) {
            console.log(error);
            if (error instanceof Error) alert(error.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSetUser}>
                <h3 className='text-white'>
                    {currUser
                        ? `You are editing: ${currUser.username}`
                        : 'Enter user email'}
                </h3>
                <input type="text" ref={usernameRef} className="text-black" />
                <button className='text-white' type='submit'>Set</button>
            </form>
            {currUser && <div className="flex gap-4">
                <button onClick={handleDeleteUser}>Delete user</button>
                <div>
                    <label htmlFor="">key</label>
                    <select name="key" id="key" onChange={(e) => setFieldData({value: '', key: e.target.value})}>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                        <option value="balance">Balance</option>
                        <option value="password">Password</option>
                        <option value="isAdmin">Admin Account</option>
                    </select>
                    <label htmlFor="">value</label>
                    {fieldData.key === 'isAdmin' && <select name="value" id="value" onChange={(e) => setFieldData(prev => ({...prev, value: e.target.value}))}>
                        <option value="">Select value</option>
                        <option value="1">True</option>
                        <option value="0">False</option>
                    </select>}
                    {fieldData.key !== 'isAdmin' && <input type={fieldData.key === 'balance' ? 'number' : 'text'} value={fieldData.value} onChange={(e) => setFieldData(prev => ({...prev, value: e.target.value}))}/>}
                    <button onClick={handleSetField}>Set data</button>
                </div>
            </div>}
        </>
    );
}
