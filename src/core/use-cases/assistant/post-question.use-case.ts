import { PostQuestionResponse } from "../../../interfaces";

export const postQuestionUseCase = async (threadId: string, question?: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_URL}/user-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question, threadId})
        });


        const replies = await resp.json() as PostQuestionResponse[]
        return replies;

    } catch (error) {
        console.log(error)
        throw new Error("No se pudo obtener la respuesta");
    }

}