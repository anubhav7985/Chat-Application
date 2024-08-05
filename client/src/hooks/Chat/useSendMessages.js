import { useState } from "react"
import useConversations from "../../zustand/useConversations"
import toast from "react-hot-toast"
import axios from "axios"

const useMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversations()

    const sendMessage = (message) => {
        const sender = JSON.parse(localStorage.getItem("chat-user"));
        setLoading(true)
        axios.post(`http://localhost:8000/api/message/send/${sender._id}/${selectedConversation._id}`, {
            message: message
        }).then(res => {
            if (res.error)
                throw new Error(res.error)
            setMessages([...messages, res])
        }).catch(err => toast.error(err.message)).finally(() => {
            setLoading(false)
        })
    }
    return { loading, sendMessage }
}

export default useMessages