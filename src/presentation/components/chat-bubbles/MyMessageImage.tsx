
interface Props {
    alt: string;
    imageUrl?: string;
    onSelectImage?: (imageUrl: string) => void;
}

export const MyMessageImage = ({alt, imageUrl, onSelectImage}: Props) => {
  if(!imageUrl) return null;
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl object-cover">
                <small>Aqui esta tu imagen</small>
                <img src={imageUrl} alt={alt}  className="w-96 h-96 rounded-xl mt-2 cursor-pointer" onClick={() => onSelectImage && onSelectImage(imageUrl)} />
            </div>
        </div>
    </div>
  )
}
