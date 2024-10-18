import { useState } from "react"
import { GptMessage } from "../../components/chat-bubbles/GptMessage";
import { MyMessage } from "../../components/chat-bubbles/MyMessage";
import { TextMessageBox } from "../../components/chat-input-boxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { imageGenerationUseCase, imageVariationUseCase } from "../../../core/use-cases";
//import { MyMessageImage } from "../../components/chat-bubbles/MyMessageImage";
import { MyMessageSelectableImage } from "../../components/chat-bubbles/MyMessageSelectableImage";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageTunningPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    isGpt: true,
    text: "Bienvenido a la generacion de imagenes",
    info: {
      alt: "alt",
      imageUrl: 'http://localhost:3000/gpt/image-generation/1729253823821.png'
    }
  }])
  const [originalAndMaskImage, setOriginalAndMaskImage] = useState({
    originalImage: undefined as string | undefined,
    maskImage: undefined as string | undefined
  })

  const handleVariation = async () => {
    setIsLoading(true);
    const data = await imageVariationUseCase(originalAndMaskImage.originalImage);
    setIsLoading(false);
    if(!data) {
      setMessages(prev => [...prev, {text: "Hubo un error al generar la imagen", isGpt: true}]);
      return;
    }
    const { alt, url } = data;
    setMessages(prev => [...prev, {text: "Variacion", isGpt: true, info: {imageUrl: url, alt}}]);
    setOriginalAndMaskImage({
      maskImage: undefined,
      originalImage: undefined,
    });
  }

  const handleMessage = async (text: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, {text, isGpt: false}]);

    const data = await imageGenerationUseCase(text, originalAndMaskImage.maskImage, originalAndMaskImage.originalImage);
    setIsLoading(false);
    if(!data) {
      setMessages(prev => [...prev, {text: "Hubo un error al generar la imagen", isGpt: true}]);
      return;
    }
    const { alt, url } = data;
    setMessages(prev => [...prev, {text: text, isGpt: true, info: {imageUrl: url, alt}}]);
  }


  return (
    <>
      {
        originalAndMaskImage.originalImage && (
          <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
            <span>Editando</span>
            <img src={originalAndMaskImage.maskImage ?? originalAndMaskImage.originalImage} alt="Imagen original" className="border rounded-xl w-36 h-36 object-contain" />
            <button onClick={handleVariation} disabled={isLoading} className="btn-primary mt-2">Generar variacion</button>
          </div>
        )
      }
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessage text="¿Que imagen deseas generar hoy?" />

            {
              messages.map((message, index) => {
                if(message.isGpt) {
                  /*return <MyMessageImage onSelectImage={(url) => setOriginalAndMaskImage({
                    maskImage: undefined,
                    originalImage: url
                  })} key={index} alt={message.info?.alt || ""} imageUrl={message.info!.imageUrl!} />*/
                   return <MyMessageSelectableImage onSelectImage={(mask) => setOriginalAndMaskImage({
                    maskImage: mask,
                    originalImage: message.info?.imageUrl
                  })} key={index} alt={message.info?.alt || ""} imageUrl={message.info!.imageUrl!} />
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
    </>
  )
}
