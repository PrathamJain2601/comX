import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: number
  text: string
  sender: 'user' | 'other'
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey there! 👋", sender: "other" },
    { id: 2, text: "Hi! How are you?", sender: "user" },
    { id: 3, text: "I'm doing great, thanks for asking!", sender: "other" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "user" }])
      setNewMessage("")
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, text: "Thanks for your message!", sender: "other" }])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow overflow-y-auto p-4 bg-white bg-opacity-20 backdrop-blur-lg"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-white bg-opacity-20 backdrop-blur-lg"
      >
        <form onSubmit={handleSendMessage} className="space-x-2 w-full flex justify-center items-center">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-white w-full"
          />
          <Button type="submit" size="icon" className="bg-blue-500 hover:bg-blue-600 w-10 h-10">
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </motion.div>
    </div>
  )
}