

import imgLiga from "../assets/images/liga.png";
import imgGoldenNames from "../assets/images/golden-names.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import UserContext from "../store/UserContext";

export default function RegistrationPage(){

    const [secondname, setSecondname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_again, setPasswordAgain] = useState("");
    const [privacy_accept, setPrivacyAccept] = useState(false);
    const [regulations_accept, setRegulationsAccept] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [warning, setWarning] = useState("");

    const context = useContext(UserContext);
    const navigate = useNavigate();
    
    document.title = "Регистрация | Лига преподавателей";
    const userService = new UserService();

    useEffect(() => {
        setWarning("");
    }, [secondname, firstname, patronymic, username, password, password_again, privacy_accept, regulations_accept]);

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
                                <h3>Регистрация</h3>
                            </div>
                            <div className="col-4 text-right">
                                <img src={imgGoldenNames} className="img-fluid" alt="golden-names-logo" />
                            </div>

                        </div>
                        
                        <form>
                            <div className="form-group">
                                <label htmlFor="secondname">Фамилия*</label>
                                <input type="text" name="secondname" className="form-control" onChange={e => setSecondname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname">Имя*</label>
                                <input type="text" name="firstname" className="form-control" onChange={e => setFirstname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="patronymic">Отчество <span>(напишите "Не имею", если отчество отсутствует)</span></label>
                                <input type="text" name="patronymic" className="form-control" onChange={e => setPatronymic(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Электронная почта*</label>
                                <input type="email" name="username" className="form-control" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Придумайте пароль*</label>
                                <input type="password" name="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password_again">Повторите пароль*</label>
                                <input type="password" name="password_again" className="form-control" onChange={e => setPasswordAgain(e.target.value)} />
                            </div>
                            
                            <div className="form-group accept">
                                <input type="checkbox" id="privacy_accept" checked={privacy_accept} onChange={() => setPrivacyAccept(!privacy_accept)} />
                                <label htmlFor="privacy_accept">Я согласен с <a href="/docs/Политика в отношении обработки персональных данных.pdf" target="_blank"> Политикой обработки персональных данных</a>*</label>
                            </div>
                            
                            <div className="form-group accept">
                                <input type="checkbox" id="regulations_accept"  checked={regulations_accept} onChange={() => setRegulationsAccept(!regulations_accept)} />
                                <label htmlFor="regulations_accept">Я ознакомился с <a href="/docs/Положение о конкурсе.pdf" target="_blank"> Положением о конкурсе</a> Золотые Имена Высшей Школы*
                                </label>
                            </div>

                            <hr />

                            <p className="note">Поля, отмеченные * обязательны для заполнения</p>

                            <hr />

                            <button type="button" className="btn" disabled={isLoading} onClick={async() => await userService.registration(
                                context,
                                navigate,
                                username,
                                secondname,
                                firstname,
                                patronymic,
                                password,
                                password_again,
                                privacy_accept,
                                regulations_accept,
                                setIsLoading,
                                setWarning
                            )}>Зарегистрироваться</button>
                            
                            <p className="warning">{warning}</p>

                            <hr />

                            <div className="additionally-auth">
                                <p>
                                    <NavLink exact="true" to="/login">Вернуться на страницу входа</NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}