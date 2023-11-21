import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function UserAlreadyWinnerBlock()
{
    return (
        <div className="row system-error">
            <div className="col-2 d-none d-md-block"></div>
            <div className="col-12 col-lg-8 col-md-8">
                <p>
                    Как победитель, вы не можете отправить заявку на конкурс.<br />
                    Функционал для экспертов будет доступен в блоке сообщений в профиле.
                </p>
                ...
            </div>
        </div>
    )
}