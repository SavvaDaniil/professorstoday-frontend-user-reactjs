import { useState } from "react";
import OnlineAuditoriumChatMessage from "./OnlineAuditoriumChatMessage";
import OnlineAuditoriumMessageService from "../../services/OnlineAuditoriumMessageService";
import UserMiddleware from "../../utils/UserMiddleware";


export default function OnlineAuditoriumChat(props)
{
    const [isMessageSending, setIsMessageSending] = useState(false);
    const [messageText, setMessageText] = useState("");

    const onlineAuditoriumMessageService = new OnlineAuditoriumMessageService();
    const sendMessage = async() => {
        if(isMessageSending)
        {
            return;
        }
        const userMiddleware = new UserMiddleware();
        const jwt = userMiddleware.getJWTFromCookie();
        await onlineAuditoriumMessageService.send(
            jwt,
            setIsMessageSending,
            ...
        );
    }
    
    let onlineAuditoriumChatMessages = "";
    if(props.onlineAuditoriumMessageLiteViewModels !== null){
        onlineAuditoriumChatMessages = props.onlineAuditoriumMessageLiteViewModels.map((onlineAuditoriumMessageLiteViewModel, index) => {
            return <OnlineAuditoriumChatMessage
            key={index}
            onlineAuditoriumMessageLiteViewModel={onlineAuditoriumMessageLiteViewModel}
            />
        });
    }

    return (
        <div className="chat">
            <div className="messages" 
            >

                {onlineAuditoriumChatMessages}

            </div>

            <div className="control-panel row">
                <div className="col-12 col-lg-9 col-md-9 col-sm-9">
                    <input type="text" className="form-control" maxLength={5000} 
                    onKeyDown={e => setMessageText(e.target.value)}
                    onChange={e => setMessageText(e.target.value)}
                    ...
                    />
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-3">
                    <button type="button" className="btn" 
                    ...
                    disabled={isMessageSending}
                    >Отправить
                    </button>
                </div>
            </div>

        </div>
    )

}