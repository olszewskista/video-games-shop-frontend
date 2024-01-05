import { useReducer, useContext, createContext } from 'react';

type User = {
    _id: string;
    username: string;
    email: string;
    balance: number;
    isAdmin: boolean;
    address?: {
        street: string;
        city: string;
        postCode: string;
        country: string;
    };
    creditCard?: {
        owner: string;
        number: string;
        expireMonth: string;
        expireYear: string;
        ccv: string;
    };
    orderHistory?: string[];
    library?: string[];
} | null

type Actions = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

function reducer(state: User, action: Actions) {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, dispatch] = useReducer<>(reducer, null);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}
