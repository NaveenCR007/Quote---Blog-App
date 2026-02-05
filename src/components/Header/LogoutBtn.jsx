import authService from "../../appwrite/auth"
import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import Button from "../Button"

function LogoutBtn() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        // Logs out all the users, returns a promise
        authService.logout()
            .then(() => {
                dispatch(logout())
            }).catch((error) => console.log(error))
    }

    return (
        <Button
            bgColor="bg-sky-500"
            onClick={handleLogout}
            className='shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]'
        >
            Logout
        </Button>
    )
}

export default LogoutBtn
