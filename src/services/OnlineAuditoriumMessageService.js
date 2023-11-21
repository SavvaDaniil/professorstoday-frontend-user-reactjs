import constant from "../utils/GlobalValues";


export default class OnlineAuditoriumMessageService
{
    async isAnyNew(
        jwt,
        setIsLoading, 
        //setIsError,
        lastDateOfChat,
        setLastDateOfChat,
        setOnlineAuditoriumMessageLiteViewModels,
    ){
        setIsLoading(true);
        //setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/online_auditorium_message/user/is_any_new",
            {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    "last_date_of_chat" : lastDateOfChat
                }),
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                ...
            })
            .catch((error) => {
                console.log(error);
                //setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            //setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }

    async send(
        jwt,
        setIsLoading, 
        //setIsError,
        messageText,
        setMessageText,
        updateChatCallback
    ){
        setIsLoading(true);
        //setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/online_auditorium_message/user/add",
            {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    "message_text" : messageText
                }),
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success")
                {
                    if(setMessageText !== null)
                    {
                        setMessageText("");
                    }
                    if(updateChatCallback !== null)
                    {
                        updateChatCallback();
                    }
                } else
                {
                    //setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                //setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            //setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }
}