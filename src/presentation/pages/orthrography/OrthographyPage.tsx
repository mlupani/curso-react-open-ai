import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage"
import { MyMessage } from "../../components/chat-bubbles/MyMessage"
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox"
import { TypingLoader } from "../../components/loaders/TypingLoader"
import { orthrographyCheckUseCase } from "../../../core/use-cases"
import { GptMessageOrthography } from "../../components/chat-bubbles/GptMessageOrthography"
//import { TextMessageBoxFile } from "../../components/chat-input-boxes/TextMessageBoxFile"
//import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect"

interface Message {
  text: string;
  isGpt: boolean;
  info: {
    errors: string[];
    message: string;
    userScore: number;
  }
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handleMessage = async (msj: string) => {
    setIsLoading(true);
    const {message, ok, errors, userScore  } = await orthrographyCheckUseCase(msj);
    if(!ok){
      setMessages([...messages, {text: "No se pudo obtener la informacion", isGpt: false, info: {
        errors: [],
        message: "",
        userScore: 0
      }}]);
    }

    setMessages([...messages, {text: message, isGpt: true, info: { errors, message,userScore }}]);

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
                return <GptMessageOrthography key={index} {...message.info} />
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
