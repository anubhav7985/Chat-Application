import {useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext()

    const signup = (inputs) => {
        const fullName = inputs.fullName
        const userName = inputs.userName
        const password = inputs.password
        const confirmPassword = inputs.confirmPassword
        const gender = inputs.gender
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });
        if (!success)
            return;
        setLoading(true);

        fetch("http://localhost:8000/api/auth/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({fullname: fullName, username: userName, password, confirmPassword, gender})
        }).then((res) => {
            return res.json()
        }).then(resData => {
            localStorage.setItem("chat-user",JSON.stringify(resData))
            setAuthUser(resData)
            console.log(resData)
        }).catch(err => {
            toast.error(err.message)
        }).finally(()=> {
            setLoading(false)
        })
    }
    return {loading, signup}
}

export default useSignup

const handleInputErrors = ({ fullName, userName, password, confirmPassword, gender }) => {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Password doesn't match")
        return false
    }
    if (password.length < 6) {
        toast.error("Password must be min of length 6")
        return false;
    }
    return true;
}