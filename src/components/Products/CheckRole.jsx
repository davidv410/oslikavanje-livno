import { jwtDecode } from "jwt-decode"

const CheckRole = ({ children }) => {

    const isLoggedIn = () => {
        return localStorage.getItem('token')
    }

    const getUser = () => {
        const token = localStorage.getItem('token')
        if(!token){
            return null
        }else{
            const decode = jwtDecode(token)
            return decode
        }
    }

    const user = getUser()

    // user.role

    return(
        <>
            { isLoggedIn() ? (user.role === 'Admin' ? children : null ) : null }
        </>
    )

}

export default CheckRole