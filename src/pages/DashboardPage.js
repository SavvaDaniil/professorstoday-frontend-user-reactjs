import { useEffect, useState } from "react"
import UserService from "../services/UserService";
import UserMiddleware from "../utils/UserMiddleware";
import { SystemLoadingPage } from "../components/SystemLoadingPage";
import { SystemErrorPage } from "../components/SystemErrorPage";
import { Link } from "react-router-dom";


export function DashboardPage(props)
{
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isError, setIsError] = useState();
    const [isSaving, setIsSaving] = useState(false);
    const [statusOfUpdate, setStatusOfUpdate] = useState();

    const [leagueParticipationMembershipStatusMicroViewModels, setLeagueParticipationMembershipStatusMicroViewModels] = useState([]);
    const [regionMicroViewModels, setRegionMicroViewModels] = useState([]);
    const [universityMicroViewModels, setUniversityMicroViewModels] = useState([]);

    const [userProfileLiteViewModel, setUserProfileLiteViewModel] = useState({
        username : "",
        secondname : "",
        firstname : "",
        patronymic : "",
        password_new : "",
        password_current : ""
    });


    useEffect(() => {
        setStatusOfUpdate("");
    }, [isProfileLoading, isError, userProfileLiteViewModel]);

    const userService = new UserService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();

    const formListener = (e) => {
        let copiedUserProfileLiteViewModel = {...userProfileLiteViewModel};
        copiedUserProfileLiteViewModel[e.target.name] = e.target.value;
        setUserProfileLiteViewModel(() => ({
            ...copiedUserProfileLiteViewModel
        }));
    }
    
    useEffect(() => {
        const userMiddleware = new UserMiddleware();
        const jwt = userMiddleware.getJWTFromCookie();

        async function profileGet(){
            const userService = new UserService();
            await userService.profileGet(
                jwt,
                setIsProfileLoading,
                setIsError,
                setLeagueParticipationMembershipStatusMicroViewModels,
                setRegionMicroViewModels,
                setUniversityMicroViewModels,
                setUserProfileLiteViewModel,
            );
        }
        profileGet();

        return () => {
            
        }
    }, [])

    if(isProfileLoading)
    {
        return (
            <SystemLoadingPage />
        )
    }

    if(isError)
    {
        return (
            <SystemErrorPage tryAgain={async() => await userService.profileGet(
                    jwt,
                    setIsProfileLoading,
                    setIsError,
                    setLeagueParticipationMembershipStatusMicroViewModels,
                    setRegionMicroViewModels,
                    setUniversityMicroViewModels,
                    setUserProfileLiteViewModel
                )
            } />
        )
    }

    let leagueParticipationMembershipStatusOptions = leagueParticipationMembershipStatusMicroViewModels.map((leagueParticipationMembershipStatusMicroViewModel, index) => {
        return <option 
        key={index} 
        value={leagueParticipationMembershipStatusMicroViewModel.id}>
            {leagueParticipationMembershipStatusMicroViewModel.name}
        </option>
    })
    let regionMicroOptions = regionMicroViewModels.map((regionMicroViewModel, index) => {
        return <option key={index} value={regionMicroViewModel.id}>{regionMicroViewModel.name}</option>
    });
    let universityMicroOptions = universityMicroViewModels.map((universityMicroViewModel, index) => {
        return <option key={index} value={universityMicroViewModel.id}>{universityMicroViewModel.name}</option>
    });

    
    let contentForExpert = "";
    if(userProfileLiteViewModel.is_expert !== null && typeof(userProfileLiteViewModel.is_expert) !== "undefined")
    {
        if(userProfileLiteViewModel.is_expert )
        {
            contentForExpert = <div className="alert alert-warning" role="alert">
                <p>
                    Уважаемый эксперт, ожидаем вас на странице <Link to="/expert" >эксперта</Link>
                    <br />
                    для распредления заявок.
                </p>
            </div>
        }
    }
    

    return (         

        <form className="profile">
            {contentForExpert}
            <div className="form-group">
                <label>Электронная почта*</label>
                <input type="email" name="username" className="form-control" defaultValue={userProfileLiteViewModel.username} onChange={formListener} />
            </div>
            <div className="form-group">
                <label>Фамилия*</label>
                <input type="text" name="secondname" className="form-control" defaultValue={userProfileLiteViewModel.secondname} onChange={formListener} />
            </div>
            <div className="form-group">
                <label>Имя*</label>
                <input type="text" name="firstname" className="form-control" defaultValue={userProfileLiteViewModel.firstname} onChange={formListener} />
            </div>
            
            ...

            <div className="form-group">
                <label>Участие в Лиге Преподавателей Высшей Школы*</label>
                <select name="league_participation_is_membership" className="form-control" defaultValue={userProfileLiteViewModel.league_participation_is_membership} onChange={formListener}>
                    <option value={0}>- не выбрано</option>
                    <option value={1}>Не являюсь участником Лиги Преподавателей Высшей Школы</option>
                    <option value={2}>Являюсь участником Лиги Преподавателей Высшей Школы</option>
                </select>
            </div>
            <div className="form-group">
                <label>Статус участия в конкурсе*</label>
                <select name="league_participation_membership_status_id" className="form-control" defaultValue={userProfileLiteViewModel.league_participation_membership_status_id} onChange={formListener}>
                    <option value={0}>- не выбрано</option>

                    {leagueParticipationMembershipStatusOptions}

                </select>
            </div>

            <hr />

            <div className="form-group">
                <label>Новый пароль</label>
                <input type="password" name="password_new" className="form-control" onChange={formListener} />
            </div>

            <div className="form-group">
                <label>Текущий пароль</label>
                <input type="password" name="password_current" className="form-control" onChange={formListener} />
            </div>

            <hr />

            <div className="control">
                <button type="button" className="btn" disabled={isSaving} onClick={async() => 
                    await userService.profileUpdate(
                        jwt,
                        setIsSaving,
                        setStatusOfUpdate,
                        userProfileLiteViewModel
                    )
                }>Сохранить</button>
                <p className="result">{statusOfUpdate}</p>
            </div>


        </form>
    )
}