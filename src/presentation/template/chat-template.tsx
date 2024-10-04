import { useState } from "react"
import { GptMessage } from "../components/chat-bubbles/GptMessage";
import { MyMessage } from "../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../components/loaders/TypingLoader";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handleMessage = async (message: string) => {
    setIsLoading(true);
    setMessages([...messages, {text: message, isGpt: false}]);

    //TODO: use case


    setIsLoading(false);
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones" />

          {
            messages.map((message, index) => {
              if(message.isGpt) {
                return <GptMessage key={index} text={"Mensaje de GPT"} />
              } else {
                return <MyMessage key={index} text={message.text} />
              }
            })
          }

          {
            isLoading &&
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader/>
              </div>
          }

        </div>
      </div>

      <TextMessageBox onSendMessage={handleMessage} placeholder="Escribe aqui lo que deseas" disableCorrections  />
    </div>
  )
}
