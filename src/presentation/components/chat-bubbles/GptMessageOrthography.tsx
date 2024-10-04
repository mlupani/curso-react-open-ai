
interface Props {
    userScore: number;
    errors: string[];
    message: string;
}

export const GptMessageOrthography = ({userScore, errors, message}: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                <h3 className="text-2xl">Tu puntaje es: { userScore }%</h3>
                <p>{ message }</p>
                {
                    errors.length > 0 &&
                    <div>
                        <h4>Errores encontrados:</h4>
                        <ul>
                            {
                                errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
