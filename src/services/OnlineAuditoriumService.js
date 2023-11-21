import constant from "../utils/GlobalValues";

export default class OnlineAuditoriumService
{
    async getLite(
        jwt,
        setIsLoading, 
        setIsError,
        isLaunched,
        setIsLaunched,
        youtubeVideoId,
        setYoutubeVideoId,
        isOpen,
        setIsOpen,
        lastDateOfChat,
        updateChatCallback
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/online_auditorium/user/get_lite",
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
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.onlineAuditoriumDataLiteViewModel !== null)
                {
                    ...
                }
            })
            .catch((error) => {
                console.log(error);
                if(!isLaunched)
                {
                    setIsError(true);
                }
            })
        } catch(error)
        {
            console.log(error);
            if(!isLaunched)
            {
                setIsError(true);
            }
        } finally
        {
            setIsLoading(false);
        }
    }
}