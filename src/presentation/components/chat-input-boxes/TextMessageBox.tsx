import { useState } from "react";

interface Props {
    onSendMessage : (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
}


export const TextMessageBox = ({onSendMessage, placeholder, disableCorrections = false}: Props) => {

    const [message, setMessage] = useState("");

    const handleMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(message.trim().length === 0) return;
        onSendMessage(message);
        setMessage("");
    }


  return (
    <form onSubmit={handleMessage} action="" className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div className="flex-grow">
            <div className="relative w-full">
                <input type="text" placeholder={placeholder} className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10" 
                autoFocus 
                name="message" 
                autoComplete={disableCorrections ? 'on' : 'off'} 
                autoCorrect={disableCorrections ? 'on' : 'off'} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                spellCheck={disableCorrections ? 'true' : 'false'} 
                />
            </div>
        </div>

        <div className="ml-4">
            <button className="btn-primary">
                <span className="mr-2">Enviar</span>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    </form>
  )
}
