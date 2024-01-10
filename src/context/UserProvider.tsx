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
        expireMonth: number;
        expireYear: number;
        cvv: number;
    };
    orderHistory?: string[];
    library?: string[];
    favorites?: string[];
} | null;

type Actions = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' } | {type: 'UPDATE_FAVORITES', payload: string[]};

type UserContextProps  = {
    user: User;
    dispatch: React.Dispatch<Actions>;
}

const UserContext = createContext<UserContextProps>({ user: null, dispatch: () => {} });

export const useUser = () => useContext(UserContext);

function reducer(state: User, action: Actions) {
    switch (action.type) {
        case 'LOGIN':
            return action.payload;
        case 'LOGOUT':
            return null;
        case 'UPDATE_FAVORITES':
            if (state) {
                return {...state, favorites: action.payload}
            }
            return state;
        default:
            return state;
    }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, dispatch] = useReducer(reducer, null);
    console.log(user)

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}
