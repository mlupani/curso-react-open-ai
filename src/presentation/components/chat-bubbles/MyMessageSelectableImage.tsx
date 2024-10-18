import { useEffect, useRef, useState } from "react";

interface Props {
    alt: string;
    imageUrl?: string;
    onSelectImage?: (imageUrl?: string) => void;
}

export const MyMessageSelectableImage = ({alt, imageUrl, onSelectImage}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalImageRef = useRef<HTMLImageElement>()
  const [isDrawing, setIsDrawing] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});

  useEffect(() => {
    if(!imageUrl) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.alt = alt;
    image.src = imageUrl;

    originalImageRef.current = image;

    image.onload = () => {
        ctx.drawImage(image, 0, 0, 1024, 1024);
    }
  }, [imageUrl, alt])

  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setIsDrawing(true);

    // Obtener las coordenadas del mouse relativo al canvas 
    const startX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const startY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // console.log({startX, startY});
    setCoords({ x: startX, y: startY });
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL("image/png");
    // console.log({ url });
    // https://jaredwinick.github.io/base64-image-viewer/
    if(onSelectImage)
        onSelectImage(url);

  };
  const onMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;

    const currentX =
      event.clientX - canvasRef.current!.getBoundingClientRect().left;
    const currentY =
      event.clientY - canvasRef.current!.getBoundingClientRect().top;

    // Calcular el alto y ancho del rectángulo
    const width = currentX - coords.x;
    const height = currentY - coords.y;

    const canvaWidth = canvasRef.current!.width;
    const canvaHeight = canvasRef.current!.height;

    // Limpiar el canva
    const ctx = canvasRef.current!.getContext("2d")!;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(originalImageRef.current!, 0, 0, canvaWidth, canvaHeight);

    // Dibujar el rectangulo, pero en este caso, limpiaremos el espacio
    // ctx. fillRect(coords.x, coords.y, width, height);
    ctx.clearRect(coords.x, coords.y, width, height);
  };

  const resetCanvas = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.drawImage(
      originalImageRef.current!,
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );

    if(onSelectImage) onSelectImage(undefined);
  };


  if(!imageUrl) return null;


  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl object-cover">
                <canvas onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} ref={canvasRef} height="1024" width="1024" ></canvas>
                <button onClick={resetCanvas} className="btn-primary mt-2">
                    Resetear Cambios
                </button>
                {
                    /*
                        <small>Aqui esta tu imagen</small>
                        <img src={imageUrl} alt={alt}  className="w-96 h-96 rounded-xl mt-2 cursor-pointer" onClick={() => onSelectImage && onSelectImage(imageUrl)} />
                    */
                }
            </div>
        </div>
    </div>
  )
}
