import { useEffect, useState } from "react";
import { SystemErrorPage } from "../components/SystemErrorPage";
import { SystemLoadingPage } from "../components/SystemLoadingPage";
import UserService from "../services/UserService";
import UserMiddleware from "../utils/UserMiddleware";
import UserExpertNotSetuped from "../components/layouts/UserExpertNotSetuped";
import { ProfileNotFilledErrorPage } from "../components/ProfileNotFilledErrorPage";
import UserNotExpertErrorBlock from "../components/UserNotExpertErrorBlock";
import { Link } from "react-router-dom";


export default function ExpertPage()
{
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isUserNotExpertError, setIsUserNotExpertError] = useState(false);
    const [isUserExpertSetuped, setIsUserExpertSetuped] = useState(false);
    const [isProfileNotFilledError, setIsProfileNotFilledError] = useState(false);
    const [nominationMicroViewModels, setNominationMicroViewModels] = useState([]);
    const [userExpertStatementGradePreviewViewModels, setUserExpertStatementGradePreviewViewModels] = useState([]);

    const userService = new UserService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();

    const getExpert = async() => {
        await userService.expertGet(
            jwt,
            setIsLoading,
            setIsError,
            setIsProfileNotFilledError,
            setIsUserNotExpertError,
            setIsUserExpertSetuped,
            setNominationMicroViewModels,
            setUserExpertStatementGradePreviewViewModels
        )
    }

    useEffect(() => {
        getExpert();
    },[])

    if(isProfileNotFilledError)
    {
        return <ProfileNotFilledErrorPage />
    }
    if(isUserNotExpertError)
    {
        return <UserNotExpertErrorBlock />
    }

    if(isLoading)
    {
        return <SystemLoadingPage />;
    }

    if(isError)
    {
        return <SystemErrorPage />;
    }

    if(!isUserExpertSetuped)
    {
        return (
            <div className="page expert">
                <UserExpertNotSetuped
                    nominationMicroViewModels={nominationMicroViewModels}
                />
            </div>
        )
    }

    const userExpertStatementGradePreviewTds = userExpertStatementGradePreviewViewModels.map((userExpertStatementGradePreviewViewModel, index) => {

        let userFIO = "<Ошибка поиска пользователя>";
        if(userExpertStatementGradePreviewViewModel.userMicroViewModel !== null 
            && typeof(userExpertStatementGradePreviewViewModel.userMicroViewModel) !== "undefined"
        ){
            userFIO = userExpertStatementGradePreviewViewModel.userMicroViewModel.secondname + " " + userExpertStatementGradePreviewViewModel.userMicroViewModel.firstname;
        }
        
        let nominationName = "<Ошибка номинации>";
        if(userExpertStatementGradePreviewViewModel.nominationMicroViewModel !== null 
            && typeof(userExpertStatementGradePreviewViewModel.nominationMicroViewModel) !== "undefined"
        ){
            nominationName = userExpertStatementGradePreviewViewModel.nominationMicroViewModel.name;
        }


        return <tr key={index} >
            <td>
                {userFIO}
            </td>
            <td>
                {nominationName}
            </td>
            <td>
                {userExpertStatementGradePreviewViewModel.is_appreciated ? <span>Заявка оценена</span> : <span className="warning">Заявка не оценена</span>}
            </td>
            <td>
                <Link to={"/expert/user_statement_grade/" + userExpertStatementGradePreviewViewModel.id} target="_blank">Перейти</Link>
            </td>
        </tr>
    })

    return (
        <div className="page expert">
            <h3>Экспертиза заявок</h3>
            <hr />
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            Фамилия Имя Отчество
                        </th>
                        <th>
                            Номинация
                        </th>
                        <th>
                            Статус заявки
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userExpertStatementGradePreviewTds}
                </tbody>
            </table>
        </div>
    )
}
