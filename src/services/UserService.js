import constant from "../utils/GlobalValues";
import UserMiddleware from "../utils/UserMiddleware";



export default class UserService
{

    async expertUserStatementGradeGet(
        jwt, 
        setIsLoading, 
        setIsError, 
        user_expert_statement_grade_id,
        setUserExpertStatementGradeEditViewModel,
        setUserStatementViewModel,
        setLeagueParticipationMembershipStatusMicroViewModels,
        setRegionMicroViewModels,
        setUniversityMicroViewModels,
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/user/expert/" + user_expert_statement_grade_id,
            {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" 
                    && jsonAnswerStatus.userExpertStatementGradeEditViewModel !== null
                    && typeof(jsonAnswerStatus.userExpertStatementGradeEditViewModel) !== "undefined"
                ){
                    setUserExpertStatementGradeEditViewModel(jsonAnswerStatus.userExpertStatementGradeEditViewModel);

                    if(jsonAnswerStatus.userExpertStatementGradeEditViewModel.userStatementViewModel !== null
                        && typeof(jsonAnswerStatus.userExpertStatementGradeEditViewModel.userStatementViewModel) !== "undefined"
                        && ...
                    ){
                        setUserStatementViewModel(jsonAnswerStatus.userExpertStatementGradeEditViewModel.userStatementViewModel);
                    }
                    
                    ...

                } else 
                {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }

    async expertSetup(
        jwt, 
        setIsLoading, 
        setWarning,
        nominationIds,
    ){
        setIsLoading(true);
        setWarning("Идет загрузка...");
        try
        {
            await fetch(constant.baseDomain + "/api/user/expert/setup",
            {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    "nomination_ids" : nominationIds
                }),
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                setWarning("");
                if(jsonAnswerStatus.status === "success")
                {
                    window.location.reload();
                } else if(...)
                {
                    setWarning("Пользователь не является экспертов");
                } else if(...)
                {
                    setWarning("Не выбраны номинации");
                } else 
                {
                    setWarning("Неизвестная ошибка на сервере");
                }
            })
            .catch((error) => {
                console.log(error);
                setWarning("Неизвестная ошибка на сервере");
            })
        } catch(error)
        {
            console.log(error);
            setWarning("Неизвестная ошибка на сервере");
        } finally
        {
            setIsLoading(false);
        }
    }

    async expertGet(
        jwt, 
        setIsLoading, 
        setIsError, 
        setIsProfileNotFilledError,
        setIsUserNotExpertError,
        setIsUserExpertSetuped,
        setNominationMicroViewModels,
        setUserExpertStatementGradePreviewViewModels,
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/user/expert",
            {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userExpertStatementPreviewsSearchDataViewModel !== null)
                {
                    if(jsonAnswerStatus.userExpertStatementPreviewsSearchDataViewModel.is_expert_setuped !== null
                        && typeof(jsonAnswerStatus.userExpertStatementPreviewsSearchDataViewModel.is_expert_setuped) !== "undefined"
                        && setIsUserExpertSetuped !== null)
                    {
                        setIsUserExpertSetuped(jsonAnswerStatus.userExpertStatementPreviewsSearchDataViewModel.is_expert_setuped);
                    }
                    ...
                    setIsError(false);
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "..."
                    && setIsProfileNotFilledError !== null)
                {
                    setIsProfileNotFilledError(true);
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "..."
                    && setIsUserNotExpertError !== null)
                {
                    setIsUserNotExpertError(true);
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "..."
                    && setIsUserExpertSetuped !== null)
                {
                    setIsUserExpertSetuped(false);
                } else 
                {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }


    async profileUpdate(
        jwt, 
        setIsLoading, 
        setStatusOfUpdate,
        userProfileLiteViewModel
    ){
        setIsLoading(true);
        setStatusOfUpdate("Идёт сохранение...");
        

        try
        {
            await fetch(constant.baseDomain + "/api/user/profile",
            {
                method: 'PUT',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "username" : userProfileLiteViewModel.username,
                    "secondname" : userProfileLiteViewModel.secondname,
                    "firstname" : userProfileLiteViewModel.firstname,
                    ...
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success")
                {
                    if(jsonAnswerStatus.access_token !== null && jsonAnswerStatus.access_token !== "")
                    {
                        const userMiddleware = new UserMiddleware();
                        userMiddleware.setJWTToCookie(jsonAnswerStatus.access_token);
                    }
                    setStatusOfUpdate("Успешно сохранено");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setStatusOfUpdate("Неверное введен текущий пароль");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setStatusOfUpdate("Логин уже зарегистрирован в базе");
                } else
                {
                    setStatusOfUpdate("Неизвестная ошибка");
                }
            })
            .catch((error) => {
                console.log(error);
                setStatusOfUpdate("Неизвестная ошибка");
            })
        } catch(error)
        {
            console.log(error);
            setStatusOfUpdate("Неизвестная ошибка");
        } finally
        {
            setIsLoading(false);
        }
    }

    async profileGet(
        jwt, 
        setIsLoading, 
        setIsError, 
        setLeagueParticipationMembershipStatusMicroViewModels,
        setRegionMicroViewModels,
        setUniversityMicroViewModels,
        setUserProfileLiteViewModel,
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/user/profile",
            {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userProfileLiteViewModel !== null)
                {
                    if(jsonAnswerStatus.leagueParticipationMembershipStatusMicroViewModels !== null)
                    {
                        setLeagueParticipationMembershipStatusMicroViewModels(jsonAnswerStatus.leagueParticipationMembershipStatusMicroViewModels);
                    }
                    ...
                    setIsError(false);
                } else 
                {
                    setIsError(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            })
        } catch(error)
        {
            console.log(error);
            setIsError(true);
        } finally
        {
            setIsLoading(false);
        }
    }

    async forget(
        context,
        navigate,
        step,
        setStep,
        username,
        forget_id,
        setForgetId,
        code,
        setIsLoading,
        setWarning
    )
    {
        setWarning("");
        setIsLoading(true);
        try
        {
            await fetch(constant.baseDomain + "/api/user/forget",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "step" : step,
                    "username" : username,
                    "forget_id" : parseInt(forget_id, 10),
                    "code" : code
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && step === 0 && jsonAnswerStatus.forget_id !== 0 && jsonAnswerStatus.forget_id !== null
                    && ...)
                {
                    if(setForgetId !== null)
                    {
                        setForgetId(jsonAnswerStatus.forget_id);
                    }
                    if(setStep !== null)
                    {
                        setStep(1);
                    }

                } else if(jsonAnswerStatus.status === "success" && step === 1 && jsonAnswerStatus.access_token !== null)
                {
                    if(context !== null && navigate !== null)
                    {
                        const userMiddleware = new UserMiddleware();
                        userMiddleware.setJWTToCookie(jsonAnswerStatus.access_token);
                        context.login();
                        navigate("/");
                    }
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Электронная почта не найдена");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Превышен лимит попыток, подождите пожалуйста 20 минут");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Количество попыток исчерпано, отправьте пожалуйста код еще раз");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Количество попыток исчерпано");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Код введён неверно, осталось попыток: 1");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Код введён неверно, осталось попыток: 2");
                } else {
                    setWarning("Неизвестная ошибка на сервере");
                }
            })
            .catch((error) => {
                console.log(error);
                setWarning("Неизвестная ошибка на сервере");
            })
        } finally
        {
            setIsLoading(false);
        }
    }


    async login(
        context,
        navigate,
        username,
        password,
        setIsLoading,
        setWarning
    )
    {
        setWarning("");
        if(username === "" || password === "")
        {
            setWarning("Все поля обязательны для заполнения");
            return;
        }
        setIsLoading(true);
        try
        {
            await fetch(constant.baseDomain + "/api/user/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    ...
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.access_token !== null)
                {
                    const userMiddleware = new UserMiddleware();
                    userMiddleware.setJWTToCookie(jsonAnswerStatus.access_token);
                    context.login();
                    navigate("/");

                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "wrong")
                {
                    setWarning("Логин или пароль введены неверно");
                } else {
                    setWarning("Неизвестная ошибка на сервере");
                }
            })
            .catch((error) => {
                console.log(error);
                setWarning("Неизвестная ошибка на сервере");
            })
        } finally
        {
            setIsLoading(false);
        }
    }

    logout(context, navigate)
    {
        const userMiddleware = new UserMiddleware();
        userMiddleware.clearJWTCookie();
        context.logout();
        ...
    }

    async registration(
        context,
        navigate,
        username,
        secondname,
        firstname,
        patronymic,
        password,
        passwordAgain,
        privacy_accept,
        regulations_accept,
        setIsLoading,
        setWarning
    )
    {
        setWarning("");
        if(username === "" || secondname === "" || firstname === "" || patronymic === "" || password === "" || passwordAgain === "")
        {
            setWarning("Все поля обязательны для заполнения");
            return;
        }
        if(password !== passwordAgain)
        {
            setWarning("Пароли не совпадают");
            return;
        }
        if(!privacy_accept)
        {
            setWarning("Примите пожалуйста политику обработки персональных данных");
            return;
        }
        if(!regulations_accept)
        {
            setWarning("Ознакомьтесь пожалуйста с положением о конкурсе Золотые Имена Высшей Школы");
            return;
        }
        setIsLoading(true);
        try
        {
            await fetch(constant.baseDomain + "/api/user/registration",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "username" : username,
                    "secondname" : secondname,
                    "firstname" : firstname,
                    "patronymic" : patronymic,
                    "password" : password
                })
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.access_token !== null)
                {
                    ...

                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Логин уже зарегистрирован в базе");
                } else {
                    ...
                }
            })
            .catch((error) => {
                console.log(error);
                setWarning("Неизвестная ошибка на сервере");
            })
        } finally
        {
            setIsLoading(false);
        }
    }

}