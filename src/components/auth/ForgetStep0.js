
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserService from "../../services/UserService";

export default function ForgetStep0(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState();
    const [warning, setWarning] = useState("");

    const userService = new UserService();

    useEffect(() => {
        setWarning("");
    },[username]);

    return (
        <form>
            <div className="form-group">
                <label>Введите вашу электронную почту</label>
                <input type="email" name="..." className="form-control" disabled={isLoading} 
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <hr />

            <button type="button" className="btn" onClick={() => {
                userService.forget(
                    null,
                    null,
                    0,
                    props.setStep,
                    username,
                    0,
                    props.setForgetId,
                    null,
                    setIsLoading,
                    setWarning
            )}
            }>Отправить код</button>

            <p className="warning">{warning}</p>

            <hr />

            <div className="additionally-auth">
                <p>
                    <NavLink exact="true" to="/login">Вернуться на страницу входа</NavLink>
                </p>
            </div>
        </form>
    )
}