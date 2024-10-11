import Markdown from "react-markdown"

interface Props {
    text: string;
    audioUrl: string;
}

export const MyMessageAudio = ({text, audioUrl}: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
         <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                M
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl min-w-96">
                <Markdown>{text}</Markdown>
                <audio controls src={audioUrl} className="w-full mt-1" />
            </div>
        </div>
    </div>
  )
}
