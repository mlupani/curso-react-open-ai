
export const textToAudioUseCaseUseCase = async (prompt: string, voice: string) => {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/text-to-audio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, voice })
        });

        if(!resp.ok){
            return {
                ok: false,
                message: "No se pudo generar el audio la respuesta",
            }
        }

        const audio = await resp.blob();
        const audioUrl = URL.createObjectURL(audio);

        return {
            ok: true,
            audioUrl,
            message: prompt,
        }

    } catch (error) {

        console.log(error)
        return {
            ok: false,
            message: "No se pudo obtener la respuesta",
        }
    }

}