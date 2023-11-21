
import { NavLink, Outlet } from "react-router-dom";
import imgSocialTelegram from "../../assets/images/social-telegram.png";
import imgSocialVK from "../../assets/images/social-vk.png";
import imgSocialBot from "../../assets/images/social-bot.png";
import imgLigaBW from "../../assets/images/liga-bw.png";


export function AuthLayout(){


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
            
            <Outlet />

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