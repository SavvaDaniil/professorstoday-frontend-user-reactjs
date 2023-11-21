import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import UserMiddleware from "../utils/UserMiddleware";
import { SystemLoadingPage } from "../components/SystemLoadingPage";
import { SystemErrorPage } from "../components/SystemErrorPage";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import constant from "../utils/GlobalValues";
import UserExpertStatementGradePointBlock from "../components/userExpertStatementGrade/UserExpertStatementGradePointBlock";
import UserExpertStatementGradeService from "../services/UserExpertStatementGradeService";


export default function ExpertUserStatementGradePage()
{
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [warning, setWarning] = useState("");
    const [userExpertStatementGradeEditViewModel, setUserExpertStatementGradeEditViewModel] = useState(null);
    const [userStatementViewModel, setUserStatementViewModel] = useState(null);

    const [leagueParticipationMembershipStatusMicroViewModels, setLeagueParticipationMembershipStatusMicroViewModels] = useState([]);
    const [regionMicroViewModels, setRegionMicroViewModels] = useState([]);
    const [universityMicroViewModels, setUniversityMicroViewModels] = useState([]);

    const [statementPage, setStatementPage] = useState(1);

    const userService = new UserService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();

    const userExpertStatementGradeService = new UserExpertStatementGradeService();

    const {user_expert_statement_grade_id} = useParams();

    const expertUserStatementGradeGet = async() => {
        await userService.expertUserStatementGradeGet(
            jwt,
            setIsLoading,
            setIsError,
            user_expert_statement_grade_id,
            setUserExpertStatementGradeEditViewModel,
            setUserStatementViewModel,
            setLeagueParticipationMembershipStatusMicroViewModels,
            setRegionMicroViewModels,
            setUniversityMicroViewModels,
        )
    }

    const expertUserStatementGradeUpdate = async() => {
        await userExpertStatementGradeService.expertUpdate(
            jwt,
            setIsSaving,
            setWarning,
            userExpertStatementGradeEditViewModel
        )
    }

    useEffect(() => {
        expertUserStatementGradeGet();
    },[])

    const statementsHeaders = [
        "Профиль",
        ...
    ];

    const changePage = (value) => {
        if(value)
        {
            if(statementPage >= 6)
            {
                return;
            }
            setStatementPage(statementPage + 1);
        } else 
        {
            if(statementPage === 1)
            {
                return;
            }
            setStatementPage(statementPage - 1);
        }
    }
    
    const formListener = (e) => {
        let copiedUserExpertStatementGradeEditViewModel = {...userExpertStatementGradeEditViewModel};
        copiedUserExpertStatementGradeEditViewModel[e.target.name] = e.target.value;
        setUserExpertStatementGradeEditViewModel(() => ({
            ...copiedUserExpertStatementGradeEditViewModel
        }));
        //console.log(copiedUserExpertStatementGradeEditViewModel);
        setWarning("");
    }

    if(isLoading)
    {
        return <SystemLoadingPage />
    }

    if((isError && !isLoading) || userExpertStatementGradeEditViewModel === null || userStatementViewModel === null)
    {
        return <SystemErrorPage tryAgain={expertUserStatementGradeGet} />
    }

    const statementId = userExpertStatementGradeEditViewModel.userStatementViewModel !== null ? userExpertStatementGradeEditViewModel.userStatementViewModel.id : "<ошибка заявления>";

    const userProfileLiteViewModel = userExpertStatementGradeEditViewModel.userProfileLiteViewModel;
    const nominationMicroViewModel = userExpertStatementGradeEditViewModel.nominationMicroViewModel;

    let userPosterImg = "";
    if(userStatementViewModel.hasOwnProperty("photo_file_src") && userStatementViewModel.photo_file_src !== null && userStatementViewModel.photo_file_src !== "")
    {
        userPosterImg = <img className="img-fluid user-poster" src={constant.baseDomain + "/" + userStatementViewModel.photo_file_src} alt="user-poster" />
    }

    ...
    
    let list_of_statement_applications_and_characteristics_files = "";
    let statement_applications_and_characteristics_file_index = 1;
    if(userStatementViewModel.userStatementApplicationsAndCharacteristicsFileViewModels !== null)
    {
        list_of_statement_applications_and_characteristics_files = <ul className="files-list">
            {userStatementViewModel.userStatementApplicationsAndCharacteristicsFileViewModels.map(userStatementApplicationsAndCharacteristicsFileViewModel => {
                return <li key={userStatementApplicationsAndCharacteristicsFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementApplicationsAndCharacteristicsFileViewModel.src} target="_blank">
                Файл №{statement_applications_and_characteristics_file_index++}</Link>
                </li>
            })}
        </ul>
    }

    let list_of_other_files = "";
    let other_file_number = 1;
    if(userStatementViewModel.userStatementOtherFileViewModels !== null)
    {
        list_of_other_files = <ul className="files-list">
            {userStatementViewModel.userStatementOtherFileViewModels.map(userStatementOtherFileViewModel => {
                return <li key={userStatementOtherFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementOtherFileViewModel.src} target="_blank">
                Файл №{other_file_number++}</Link>
                </li>;
            })}
        </ul>
    }

    return(
        <div className="page user-expert-statement-grade">
            <h5>
                Оценка заявления ID {statementId}
            </h5>
            <p><b>ФИО:</b> {userProfileLiteViewModel.secondname + " " + userProfileLiteViewModel.firstname + " " + userProfileLiteViewModel.patronymic}</p>
            <p><b>Номинация:</b> {nominationMicroViewModel.name}</p>
            <p><b>Статус заявления:</b> {userExpertStatementGradeEditViewModel.is_appreciated ? "Заявка оценена" : "Заявка не оценена"}</p>
            <p><i>Чтобы заявление было оценено, заполните пожалуйста все поля оценок и добавьте комментарий на последней странице</i></p>
            <hr />
            
            <div className="row statement-control">
                <div className="col-6 col-lg-2 col-md-2 col-sm-3">
                    <Button variant={"default " + (statementPage <= 1 || isSaving ? "disabled" : "")} disabled={statementPage <= 1 ? "disabled" : ""} onClick={() => changePage(false)}>Пред</Button>
                </div>
                <div className="col-2 d-md-none">
                    <Button variant={"default " + (statementPage >= 6 || isSaving ? "disabled" : "")} onClick={() => changePage(true)}>След</Button>
                    <br />
                </div>

                <div className="col-12 col-lg-8 col-md-8 col-sm-6">
                    <p className="statement-page-header">Стр. {statementPage}/6 {statementsHeaders[statementPage-1]}</p>
                </div>
                <div className="col-2 d-none d-md-block">
                    <Button variant={"default " + (statementPage >= 6 || isSaving ? "disabled" : "")} onClick={() => changePage(true)}>След</Button>
                    <br />
                </div>
            </div>

            <form className="statement" encType="multipart/form-data">


                <div className={"statement-page " + (statementPage === 1 ? "active" : "")}>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1">Фотография</label> <br />
                        {userPosterImg}
                    </div>

                    <div className="form-group">
                        <label>Электронная почта*</label>
                        <input type="email" name="username" className="form-control" defaultValue={userProfileLiteViewModel.username} disabled />
                    </div>
                    <div className="form-group">
                        <label>Фамилия*</label>
                        <input type="text" name="secondname" className="form-control" defaultValue={userProfileLiteViewModel.secondname} disabled />
                    </div>
                    <div className="form-group">
                        <label>Имя*</label>
                        <input type="text" name="firstname" className="form-control" defaultValue={userProfileLiteViewModel.firstname} disabled />
                    </div>
                    
                    ...


                </div>


                <div className={"statement-page " + (statementPage === 2 ? "active" : "")}>

                    <hr /><div className="form-group row">
                        <div className="col-10">
                            <label>Образование*</label>
                            <p>{userStatementViewModel.education} </p>
                        </div>
                        <UserExpertStatementGradePointBlock 
                        nameOfValue="education"
                        formListener={formListener}
                        value={userExpertStatementGradeEditViewModel.education}
                        />
                    </div>

                    ...

                </div>


                <div className={"statement-page " + (statementPage === 3 ? "active" : "")}>
                    <hr /><div className="form-group row">
                        <div className="col-10">
                            <label>Прохождение курсов, стажировок, присвоение степени или звания и других мероприятий повышения квалификации за последние 3 года</label>
                            <p>{userStatementViewModel.another_courses_and_other}</p>
                        </div>
                        <UserExpertStatementGradePointBlock 
                        nameOfValue="another_courses_and_other"
                        formListener={formListener}
                        value={userExpertStatementGradeEditViewModel.another_courses_and_other}
                        />
                    </div>
                    
                    ...

                </div>


                <div className={"statement-page " + (statementPage === 5 ? "active" : "")}>
                    ...

                </div>


                <div className={"statement-page " + (statementPage === 6 ? "active" : "")}>

                    <hr /><div className="form-group row">
                        <div className="col-10">
                            <label htmlFor="other_social_public_educational_work">Прочая социальная, общественная, воспитательная работа</label>
                            <p>{userStatementViewModel.other_social_public_educational_work}</p>
                        </div>
                        <UserExpertStatementGradePointBlock 
                        nameOfValue="other_social_public_educational_work"
                        formListener={formListener}
                        value={userExpertStatementGradeEditViewModel.other_social_public_educational_work}
                        />
                    </div>

                    ...


                    <hr /><div className="form-group row">
                        <div className="col-10">
                            <label htmlFor="applications_and_characteristics_files">
                                Ходатaйства и характеристики по одному до 40 шт. (Формат JPG, PNG, PDF не более 1МБ каждый)
                                <br /> 
                                <Link to="/docs/Образец ходатайства.pdf" target="_blank"> Образец ходатaйства </Link> 
                            </label> 
                            <br />

                            {list_of_statement_applications_and_characteristics_files}

                        </div>
                        <UserExpertStatementGradePointBlock 
                        nameOfValue="applications_and_characteristics_files"
                        formListener={formListener}
                        value={userExpertStatementGradeEditViewModel.applications_and_characteristics_files}
                        />
                    </div>

                    ...

                    <hr /><div className="mb-3">
                        <label htmlFor="comment">Комментарий от эксперта</label>
                        <textarea className="form-control" id="comment" name="comment" rows={8} maxLength="5000" placeholder="" defaultValue={userExpertStatementGradeEditViewModel.comment} onChange={formListener}></textarea>
                    </div>

                </div>

                <hr />
                <div className="statement-control">
                    <Button variant="default" disabled={isLoading || isSaving} onClick={expertUserStatementGradeUpdate} >Сохранить</Button>

                    <p>{warning}</p>
                </div>

            </form>
        </div>
    )
}