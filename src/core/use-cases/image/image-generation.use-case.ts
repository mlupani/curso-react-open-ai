
type Image = {
    url: string;
    alt: string;
}

export const imageGenerationUseCase = async (prompt: string, maskImage?: string, originalImage?: string):Promise<Image | null> => {

    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/image-generation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, maskImage, originalImage})
        });

        const { revised_prompt: alt, url } = await resp.json();

        return {url, alt }

    } catch (error) {
        console.log(error);
        return null;
    }

}