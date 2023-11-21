import { useEffect, useState } from "react";
import { SystemLoadingPage } from "../components/SystemLoadingPage";
import OnlineAuditoriumService from "../services/OnlineAuditoriumService";
import UserMiddleware from "../utils/UserMiddleware";
import { SystemErrorPage } from "../components/SystemErrorPage";
import OnlineAuditoriumChat from "../components/onlineAuditorium/OnlineAuditoriumChat";
import OnlineAuditoriumMessageService from "../services/OnlineAuditoriumMessageService";



export default function OnlineAuditoriumPage(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLaunched, setIsLaunched] = useState(false);
    const [youtubeVideoId, setYoutubeVideoId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [lastDateOfChat, setLastDateOfChat] = useState(null);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [onlineAuditoriumMessageLiteViewModels, setOnlineAuditoriumMessageLiteViewModels] = useState([]);

    const onlineAuditoriumMessageService = new OnlineAuditoriumMessageService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();

    const updateChat = async() => {
        if(isChatLoading)
        {
            return;
        }
        await onlineAuditoriumMessageService.isAnyNew(
            jwt,
            setIsChatLoading,
            lastDateOfChat,
            setLastDateOfChat,
            setOnlineAuditoriumMessageLiteViewModels
        )
    };

    const onlineAuditoriumService = new OnlineAuditoriumService();
    const getDataOfOnlineAuditorium = async() => {
        if(isLoading)
        {
            return;
        }
        onlineAuditoriumService.getLite(
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
            updateChat
        );
    }

    useEffect(() => {
        getDataOfOnlineAuditorium();
    },[isLaunched, isOpen, youtubeVideoId, lastDateOfChat])

    useEffect(() => {
        const interval = setInterval(() => {
            getDataOfOnlineAuditorium();
        }, 5000);
        return () => clearInterval(interval);
      }, [isLaunched, isOpen, youtubeVideoId, lastDateOfChat]);

    if(!isLaunched && isError)
    {
        return (
            <SystemErrorPage />
        );
    }
    if(!isLaunched && isLoading)
    {
        return (
            <SystemLoadingPage />
        );
    }
    if(!isLaunched)
    {
        return (
            <SystemLoadingPage />
        );
    }

    if(!isOpen)
    {
        return (
            <div className="page auditorium">
                <p className="text-center">
                    Извините, в данный момент онлайн аудитория закрыта
                </p>
            </div>
        )
    }

    let youtubeContent = "";
    if(youtubeVideoId !== null && youtubeVideoId !== "")
    {
        ...
    } else 
    {
        youtubeContent = <p className="text-center">Трансляция не установлена</p>
    }

    return (
        <div className="page auditorium">
            {youtubeContent}

            <hr />

            <OnlineAuditoriumChat
                onlineAuditoriumMessageLiteViewModels={onlineAuditoriumMessageLiteViewModels}
                updateChat={updateChat}
            />
        </div>
    )
}