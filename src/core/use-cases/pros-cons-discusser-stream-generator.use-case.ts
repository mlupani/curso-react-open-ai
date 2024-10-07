export async function* prosConsDiscusserStreamGeneratorUseCase (prompt: string, abortSignal: AbortSignal) {

    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt }),
            signal: abortSignal
        });

        if(!resp.ok){
            throw new Error('Error en la petición');
        }

        const reader = resp.body?.getReader();

        if(!reader){
            throw new Error('Error en el reader');
        }

        const decoder = new TextDecoder();
        let result = '';

        while(true){
            const { done, value } = await reader.read();

            if(done){
                break;
            }

            result += decoder.decode(value, {stream: true});
            yield result;
        }

    } catch (error) {

        console.log(error)
        return null;
    }

}