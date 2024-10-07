import { TranslateResponse } from "../../interfaces";

export const translateUseCase = async (prompt: string, lang: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang })
        });

        if(!resp.ok){
            return {
                ok: false,
                message: "No se pudo obtener la respuesta",
                errors: [],
                userScore: 0,
            }
        }

        const data = await resp.json() as TranslateResponse;

        return {
            ok: true,
            ...data
        }

    } catch (error) {

        console.log(error)
        return {
            ok: false,
            message: "No se pudo obtener la respuesta",
            errors: [],
            userScore: 0,
        }
    }

}