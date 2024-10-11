import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { textToAudioUseCaseUseCase } from "../../../core/use-cases";
import { GptMessageAudio } from "../../components/chat-bubbles/GptMessageAudio";

interface Message {
  text: string;
  isGpt: boolean;
  audio?: string;
}


const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

const disclaimer = `
  Que audio quieres escuchar hoy?
  ## Este audio es generado por IA.
`


export const TextToAudioPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handleMessage = async (prompt: string, selectedOption: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, {text: prompt, isGpt: false}]);

    const { message, ok, audioUrl } = await textToAudioUseCaseUseCase(prompt, selectedOption);

    if(!ok) return;

    setMessages(prev => [...prev, {text: `${selectedOption} - ${message}`, isGpt: true, audio: audioUrl}]);

    setIsLoading(false);
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text={disclaimer} />

          {
            messages.map((message, index) => {
              if(message.isGpt && message.audio){
                return <GptMessageAudio audioUrl={message.audio} key={index} text={message.text} />
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

      <TextMessageBoxSelect options={voices} onSendMessage={handleMessage} placeholder="Escribe aqui lo que deseas" disableCorrections  />
    </div>
  )
}
