import { OrthographyResponse } from "../../interfaces/OrthrographyResponse";

export const orthrographyCheckUseCase = async (prompt: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/orthography-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if(!resp.ok){
            return {
                ok: false,
                message: "No se pudo obtener la respuesta",
                errors: [],
                userScore: 0,
            }
        }

        const data = await resp.json() as OrthographyResponse;

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