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
            className='inline-bock px-6 py-2 duration-200 rounded-full'
        >
            Logout
        </Button>
    )
}

export default LogoutBtn
