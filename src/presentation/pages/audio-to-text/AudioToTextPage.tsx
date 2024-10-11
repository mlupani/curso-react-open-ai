import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxFile } from "../../components/chat-input-boxes/TextMessageBoxFile";
import { audioToTextUseCase } from "../../../core/use-cases";
import { MyMessageAudio } from "../../components/chat-bubbles/MyMessageAudio";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const [audioUrl, setAudioUrl] = useState("");

  const handleMessage = async (msj: string, file: File) => {
    setIsLoading(true);
    const audioUrl = URL.createObjectURL(file);
    setAudioUrl(audioUrl);
    const newMessage = msj ? `${msj} - ${file.name}` : `${file.name}`;
    setMessages(messages => [...messages, {text: newMessage, isGpt: false}]);

    const {ok, message} = await audioToTextUseCase(msj, file);

    if(!ok) return;
    setMessages(messages => [...messages, {text: message, isGpt: true}]);
    setIsLoading(false);
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, Puedes subir tu archivo de audio para convertir en texto" />

          {
            messages.map((message, index) => {
              if(message.isGpt) {
                return <GptMessage key={index} text={message.text} />
              } else {
                return <MyMessageAudio key={index} audioUrl={audioUrl} text={message.text} />
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

      <TextMessageBoxFile accept="audio/*" onSendMessage={handleMessage} placeholder="Sube tu archivo y Escribe aqui lo que deseas" disableCorrections  />
    </div>
  )
}

