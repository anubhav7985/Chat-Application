import { useEffect } from "react"
import useConversations from "../zustand/useConversations"
import notificationSound from "../assets/sounds/sound.mp3"
import { useSocketContext } from "../context/SocketContext"

const useListenMessage = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversations()

    useEffect(() => {
        socket.on("newMessage", newMessage => {
            const sound = new Audio(notificationSound)
            sound.play()
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [messages])
}

export default useListenMessage