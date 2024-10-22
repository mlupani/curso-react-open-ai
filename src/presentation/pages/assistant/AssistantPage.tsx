
import { useEffect, useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { createThreadUseCase } from "../../../core/use-cases/assistant/create-thread.use-case";
import { postQuestionUseCase } from "../../../core/use-cases/assistant/post-question.use-case";
interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const [threadId, setThreadId] = useState<string>();

  const handleMessage = async (message: string) => {
    if(!threadId) return;
    setIsLoading(true);
    setMessages([...messages, {text: message, isGpt: false}]);

    const replies = await postQuestionUseCase(threadId, message);

    replies.forEach((reply) => {
      setMessages((prev) => [...prev, {text: reply.content[0], isGpt: reply.role === "assistant"}]);
    });

    //TODO: use case
    setIsLoading(false);
  }

  useEffect(() => {
    const threadId = localStorage.getItem("threadId");
    if(threadId) {
      setThreadId(threadId);
    } else {
      createThreadUseCase().then((id) => {
          setThreadId(id);
          localStorage.setItem("threadId", id);
      });
    }
  }, [])

  useEffect(() => {
    if(threadId) {
      setMessages([{text: `Id de thread: ${threadId} `, isGpt: true}]);
    }
  }, [threadId])

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, Soy tu asistente Sam, preguntame lo que quieras" />

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

