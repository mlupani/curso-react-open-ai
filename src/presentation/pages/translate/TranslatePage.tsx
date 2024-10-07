import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxSelect } from "../../components/chat-input-boxes/TextMessageBoxSelect";
import { translateUseCase } from "../../../core/use-cases/";

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handleMessage = async (message: string, selectedOption: string) => {
    setIsLoading(true);
    const newMessage = `Traduce "${message}" al idioma ${selectedOption}`;
    setMessages(messages => [...messages, {text: newMessage, isGpt: false}]);

    const resp = await translateUseCase(message, selectedOption);

    if(resp.ok){
      setMessages(messages => [...messages, {text: resp.message, isGpt: true}]);
    } else {
      setMessages(messages => [...messages, {text: "No se pudo obtener la respuesta", isGpt: true}]);
    }

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
                return <GptMessage key={index} text={message.text} />
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

      <TextMessageBoxSelect options={languages} onSendMessage={handleMessage} placeholder="Escribe aqui lo que deseas" disableCorrections  />
    </div>
  )
}
