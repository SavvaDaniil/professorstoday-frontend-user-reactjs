import { Component } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../store/UserContext";
import imgSocialTelegram from "../../assets/images/social-telegram.png";
import imgSocialVK from "../../assets/images/social-vk.png";
import imgSocialBot from "../../assets/images/social-bot.png";
import imgLigaBW from "../../assets/images/liga-bw.png";
import imgLiga from "../../assets/images/liga.png";
import imgGoldenNames from "../../assets/images/golden-names.png";
import UserMiddleware from "../../utils/UserMiddleware";

class MainLayoutClass extends Component 
{
    static contextType = UserContext;

    constructor(props)
    {
        super(props);
        this.actionLogout = this.actionLogout.bind(this);
    }

    actionLogout()
    {
        const userMiddleware = new UserMiddleware();
        userMiddleware.clearJWTCookie();
        const { logout } = this.context;
        logout();
        this.props.navigate("/login");
    }

    changeTitle(value)
    {
        console.log("MainLayout changeTitle: " + value);
    }

    render()
    {

        let tabTitle = "Лига преподавателей";
        let pageTitle = "Профиль";
        if((window.location.pathname).indexOf("/contests") + 1)
        {
            pageTitle = "Конкурсы";
        }
        document.title = pageTitle + " | " + tabTitle;
        if((window.location.pathname).indexOf("/online_auditorium") + 1)
        {
            pageTitle = "Онлайн-аудитория";
        }
        if((window.location.pathname).indexOf("/expert") + 1)
        {
            pageTitle = "Эксперт";
        }
        document.title = pageTitle + " | " + tabTitle;
        if((window.location.pathname).indexOf("/expert/user_statement_grade/") + 1)
        {
            pageTitle = "Экспертиза заявления";
        }
        document.title = pageTitle + " | " + tabTitle;

        return (
            <>
                <div className="header">
                    <div className="top">
                        <h1>Цифровая экосистема</h1>
                    </div>
                    <div className="middle">
                        <h1>Лиги преподавателей высшей школы</h1>
                    </div>
                    <div className="bottom"></div>
                </div>

                
                <div className="container main">
                    <div className="row">
                        <div className="col-12 col-lg-3 col-md-4 col-sm-4">
                            <div className="block-bordered menu">
                                
                                <ul>
                                    <li><NavLink exact="true" activeclassname="active" to="/">Профиль</NavLink></li>
                                    <li><NavLink exact="true" activeclassname="active" to="/contests">Конкурсы</NavLink></li>
                                    <li className="logout"><NavLink to="#" onClick={() => this.actionLogout()}>Выйти</NavLink></li>
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 col-md-8 col-sm-8">
                            <div className="block-bordered page-title">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={imgLiga} className="img-fluid" alt="Лига" />
                                    </div>
                                    <div className="col-6">
                                        <h1>{pageTitle}</h1>
                                    </div>
                                    <div className="col-3 text-right">
                                        <img src={imgGoldenNames} className="img-fluid" alt="Золотые имена" />
                                    </div>
                                </div>
                            </div>

                            <div className="block-bordered">
                                <Outlet changeTitle={this.changeTitle} />
                            </div>
                        </div>
                    </div>
                </div>


                <footer>
                    <div className="top"></div>
                    <div className="pretop">
                        <p>Мы в социальных сетях</p>
                    </div>
                    <div className="middle">
                        <NavLink to="..." target="_blank">
                            <img src={imgSocialTelegram} className="img-fluid" alt="social-telegram" />
                        </NavLink>
                        <NavLink to="..." target="_blank">
                            <img src={imgSocialVK} className="img-fluid" alt="social-vkontakte" />
                        </NavLink>
                    <NavLink to="..." target="_blank">
                        <img src={imgSocialBot} className="img-fluid" alt="social-bot" />
                    </NavLink>
                    </div>

                    <div className="bottom">
                        <div className="row">
                            <div className="col-3 d-none d-md-block"></div>
                            <div className="col-12 col-lg-4 col-md-4 col-sm-12">
                                <img src={imgLigaBW} className="img-fluid" alt="liga-bw" />
                                <p>Межрегиональная общественная организация<br />"Лига Преподавателей Высшей Школы"</p>
                                <NavLink to="/privacy" exact="true">Политика обработки персональных данных</NavLink>
                            </div>
                            <div className="col-12 col-lg-4 col-md-4 col-sm-12 contacts">
                                <h6>Контакты</h6>
                                ...
                            </div>
                            <div className="col-12 copyright">
                                ...
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default function MainLayout(props){
    const navigate = useNavigate();
    return(<MainLayoutClass {...props} navigate={navigate} params={useParams()}></MainLayoutClass>)
};