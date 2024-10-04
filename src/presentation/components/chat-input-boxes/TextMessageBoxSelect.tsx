import { useState } from "react";

interface Props {
    onSendMessage : (message: string, selectedOption: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    options: {id: string, text: string}[];
}


export const TextMessageBoxSelect = ({onSendMessage, placeholder, disableCorrections = false, options}: Props) => {

    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(message.trim().length === 0) return;
        onSendMessage(message, selectedOption);
        setMessage("");
    }


  return (
    <form onSubmit={handleMessage} action="" className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div className="flex-grow">
            <div className="w-full">
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

        <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption} name="select" className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h10">
            <option value="">Seleccione</option>
            {
                options.map((option) => <option key={option.id} value={option.id}>{option.text}</option>)
            }
        </select>

        <div className="ml-4">
            <button className="btn-primary">
                <span className="mr-2">Enviar</span>
                <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    </form>
  )
}
