

import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { imageGenerationUseCase } from "../../../core/use-cases";
import { MyMessageImage } from "../../components/chat-bubbles/MyMessageImage";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageGenerationPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handleMessage = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, {text, isGpt: false}]);
    const data = await imageGenerationUseCase(text);
    setIsLoading(false);
    if(!data) {
      setMessages(prev => [...prev, {text: "Hubo un error al generar la imagen", isGpt: true}]);
      return;
    }
    const { alt, url } = data;
    setMessages(prev => [...prev, {text: text, isGpt: true, info: {imageUrl: url, alt}}]);
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="¿Que imagen deseas generar hoy?" />

          {
            messages.map((message, index) => {
              if(message.isGpt) {
                return <MyMessageImage key={index} alt={message.info?.alt || ""} imageUrl={message.info!.imageUrl!} />
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
