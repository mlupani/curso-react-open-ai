import { AudioToTextResponse } from "../../../interfaces";

export const audioToTextUseCase = async (prompt: string, file: File) => {

    try {

        const form_data = new FormData()
        form_data.append('file', file)
        form_data.append('prompt', prompt)

        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/audio-to-text`, {
            method: 'POST',
            body: form_data
        });

        if(!resp.ok){
            return {
                ok: false,
                message: "No se pudo obtener la respuesta",
            }
        }

        const data = await resp.json() as AudioToTextResponse;

        return {
            ok: true,
            message: data.text,
        }

    } catch (error) {

        console.log(error)
        return {
            ok: false,
            message: "No se pudo obtener la respuesta",
        }
    }

}