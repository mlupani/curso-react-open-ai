import { useRef, useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { prosConsDiscusserStreamGeneratorUseCase } from "../../../core/use-cases/pros-cons/pros-cons-discusser-stream-generator.use-case";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const abortController = useRef(new AbortController())
  const isRunning = useRef(false);

  const handleMessage = async (message: string) => {

    if(isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }

    isRunning.current = true;
    setIsLoading(true);
    setMessages(prev => [...prev, {text: message, isGpt: false}]);

    //TODO: use case
    const stream = prosConsDiscusserStreamGeneratorUseCase(message, abortController.current.signal);
    setMessages(messages => [...messages, {text: '', isGpt: true}]);
    setIsLoading(false);

    for await (const value of stream) {
      setMessages(messages => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = value;
        return newMessages;
      });
    }

    isRunning.current = false;
    /*
    if(!reader){
      alert("Problema con el reader");
    }

    setIsLoading(false);

    const decoder = new TextDecoder();
    let result = '';

    while(true){
        const { done, value } = await reader!.read();

        if(done){
            break;
        }

        result += decoder.decode(value, {stream: true});

        setMessages(messages => {
          const newMessages = [...messages];
          newMessages[newMessages.length - 1].text = result;
          return newMessages;
        });
    }
        */

  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, puedes escribir tu comparación" />

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

      <TextMessageBox onSendMessage={handleMessage} placeholder="Escribe aqui lo que deseas" disableCorrections  />
    </div>
  )
}
