import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function UserNotExpertErrorBlock()
{
    return (
        <div className="row system-error">
            <div className="col-2 d-none d-md-block"></div>
            <div className="col-12 col-lg-8 col-md-8">
                <p>Эта страница доступна только экспертам, если произошла ошибка, свяжитесь пожалуйста с администраторами</p>
                ...
            </div>
        </div>
    )
}