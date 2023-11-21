
import imgLiga from "../assets/images/liga.png";
import imgGoldenNames from "../assets/images/golden-names.png";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";

export function LoginPageWithRouter(){
    
    document.title = "Вход | Лига преподавателей";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [warning, setWarning] = useState("");

    const context = useContext(UserContext);
    const navigate = useNavigate();

    const userService = new UserService();
    useEffect(() => {
        setWarning("");
    }, [username, password]);

    return (
        <>
            <div className="row main auth">
                <div className="col-3 d-none d-lg-block d-md-block"></div>
                <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                    <div className="block">
                        <div className="row">
                            <div className="col-4">
                                <img src={imgLiga} className="img-fluid" alt="liga-logo" />
                            </div>
                            <div className="col-4">
                                <h3>Вход</h3>
                            </div>
                            <div className="col-4 text-right">
                                <img src={imgGoldenNames} className="img-fluid" alt="golden-names-logo" />
                            </div>

                        </div>
                        
                        <form>
                            <div className="form-group">
                                <label>Электронная почта</label>
                                <input type="email" name="username" className="form-control" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" name="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                            </div>

                            <hr />

                            <button type="button" className="btn" disabled={isLoading} onClick={async() => await userService.login(
                                context,
                                navigate,
                                username,
                                password,
                                setIsLoading,
                                setWarning
                            )}>Войти</button>
                            
                            <p className="warning">{warning}</p>

                            <hr />

                            <div className="additionally-auth">
                                <p>
                                    <NavLink exact="true" to="/registration">Еще не зарегистрированы?</NavLink>
                                    <br />
                                    <NavLink exact="true" to="/forget">Забыли пароль?</NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}