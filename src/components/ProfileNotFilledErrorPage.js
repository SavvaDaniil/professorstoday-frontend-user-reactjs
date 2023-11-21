
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ProfileNotFilledErrorPage(props){

    return (
        <div className="row ...">
            <div className="col-4 d-none d-md-block"></div>
            <div className="col-12 col-lg-4 col-md-4">
                <p>Для продолжения, необходимо полностью заполнить профиль пользователя</p>
                <Link to="/">
                    <Button variant="default">Профиль</Button>
                </Link>
            </div>
        </div>
    )
}