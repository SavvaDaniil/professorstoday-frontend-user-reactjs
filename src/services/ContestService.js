import constant from "../utils/GlobalValues";

export default class ContestService
{
    
    async list(
        jwt, 
        setIsLoading, 
        setIsError,
        setIsProfileNotFilledError,
        setIsUserAlreadyWinnerError,
        setContestUserStatementViewModels
    ){
        setIsLoading(true);
        setIsError(false);
        setIsProfileNotFilledError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/user/contest/list",
            {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.contestUserStatementViewModels !== null)
                {
                    setContestUserStatementViewModels(jsonAnswerStatus.contestUserStatementViewModels);
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setIsProfileNotFilledError(true);
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "..."
                    && setIsUserAlreadyWinnerError !== null)
                {
                    setIsUserAlreadyWinnerError(true);
                } else
                {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }
}