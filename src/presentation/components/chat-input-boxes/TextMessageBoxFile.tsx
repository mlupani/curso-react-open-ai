import { useRef, useState } from "react";

interface Props {
    onSendMessage : (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    accept: string; //image/*, .pdf, .doc, .docx, .txt
}


export const TextMessageBoxFile = ({onSendMessage, placeholder, disableCorrections = false, accept}: Props) => {

    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileSelected, setFileSelected] = useState<File | null>()

    const handleMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(message.trim().length === 0) return;
        onSendMessage(message);
        setMessage("");
    }


  return (
    <form onSubmit={handleMessage} action="" className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

        <div className="mr-3">
            <button type="button" className="flex items-center text-gray-400 hover:text-gray-600" onClick={() => inputRef.current?.click() }>
                <i className="fa-solid fa-paperclip text-xl"></i>
            </button>
            <input type="file" accept={accept} ref={inputRef} hidden onChange={(e) => setFileSelected(e.target.files?.item(0))} />
        </div>


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
            <button disabled={!fileSelected} className="btn-primary">
                {
                    !fileSelected ?
                        <span className="mr-2">Enviar</span> :
                        <span className="mr-2">{fileSelected.name.substring(0,10) + "..."}</span>
                    }
                    <i className="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    </form>
  )
}
