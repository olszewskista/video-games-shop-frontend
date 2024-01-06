import { useNavigate, useRevalidator } from "react-router-dom"

export default function useLogout() {
    const navigate = useNavigate()
    const revalidator = useRevalidator()
    function handleLogout() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('expiration')
        setTimeout(() => {
            revalidator.revalidate()
            navigate('/login')
        }, 100);
    }
    return handleLogout
}