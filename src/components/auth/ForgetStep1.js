import { useContext, useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/UserContext";

export default function ForgetStep1(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const [code, setCode] = useState("");

    const userService = new UserService();

    const context = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setWarning("");
    },[code]);

    return (
        <form>
            <div className="form-group">
                <label>Введите полученный 6-ти значный код:</label>
                <input type="number" name="..." className="form-control" 
                disabled={isLoading}
                onChange={(e) => setCode(e.target.value)} 
                />
            </div>
            <hr />

            <button type="button" className="btn" disabled={isLoading}
            onClick={() => {
                userService.forget(
                    context,
                    navigate,
                    1,
                    props.setStep,
                    null,
                    props.forgetId,
                    null,
                    code,
                    setIsLoading,
                    setWarning
            );
            }}
            >Отправить</button>
            <br />
            <br />
            <button type="button" className="btn" disabled={isLoading} onClick={() => props.setStep(0)}>Отмена</button>

            <p className="warning">{warning}</p>

            <hr />

        </form>
    )
}