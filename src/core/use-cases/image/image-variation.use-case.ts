
type Image = {
    url: string;
    alt: string;
}

export const imageVariationUseCase = async (baseImage?: string):Promise<Image | null> => {

    try {

        const resp = await fetch(`${import.meta.env.VITE_GPT_URL}/image-variation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({baseImage})
        });

        const { revised_prompt: alt, url } = await resp.json();

        return {url, alt }

    } catch (error) {
        console.log(error);
        return null;
    }

}