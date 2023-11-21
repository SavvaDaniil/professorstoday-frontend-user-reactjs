import constant from "../utils/GlobalValues";


export default class StatementService
{


    async confirm(
        jwt, 
        isSubLoading,
        setIsSubLoading,
        setWarning,
        statement_id,
        navigate
    ){
        if(isSubLoading)
        {
            return;
        }
        setIsSubLoading(true);
        setWarning("");
        try
        {
            await fetch(constant.baseDomain + "/api/user/statement/confirm/" + statement_id,
            {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                //redirect: 'follow',
                //referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success")
                {
                    navigate("/contests");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Не отправлено заявление на 1-ой странице");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Не указана номинация на 1-ой странице");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Не отправлено фото на 1-ой странице");
                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors === "...")
                {
                    setWarning("Не указано образование на 2-ой странице");
                } else if(...)
                {
                    ...
                } else
                {
                    ...
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
            setIsSubLoading(false);
        }
    }


    async withdraw(
        jwt, 
        setIsLoading,
        contest_id,
        list_of_contests_callback
    ){
        setIsLoading(true);
        try
        {
            await fetch(constant.baseDomain + "/api/user/statement/contest/"+contest_id+"/withdraw",
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
                if(jsonAnswerStatus.status === "success")
                {
                    ...
                } else
                {
                    alert("Неизвестная ошибка на сервере");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Неизвестная ошибка на сервере");
            })
        } catch(error)
        {
            console.log(error);
            alert("Неизвестная ошибка на сервере");
        } finally
        {
            setIsLoading(false);
        }
    }


    async update(
        jwt, 
        setIsLoading,
        setWarning,
        getCallback,
        contest_id,
        userStatementViewModel,

        ...
    ){
        setIsLoading(true);
        setWarning("Идет сохранение...");

        let data = new FormData()
        //data.append('file', input.files[0])
        //console.log(userStatementViewModel);
        for (let key in userStatementViewModel ) {
            //console.log(key + " : " + userStatementViewModel[key]);
            if(userStatementViewModel[key] === "null" || userStatementViewModel[key] === null)
            {
                continue;
            }
            data.append(key, userStatementViewModel[key]);
        }

        if(statement_file !== null && typeof(statement_file) !== "undefined")
        {
            data.append('statement_file', statement_file)
        }

        if(photo_file !== null && typeof(photo_file) !== "undefined")
        {
            data.append('photo_file', photo_file)
        }

        if(applicationsAndCharacteristicFile !== null && typeof(applicationsAndCharacteristicFile) !== "undefined")
        {
            data.append('applications_and_characteristics_file', applicationsAndCharacteristicFile);
        }

        if(otherFile !== null && typeof(otherFile) !== "undefined")
        {
            data.append('other_file', otherFile);
        }

        if(processDataApplicationFile !== null && typeof(processDataApplicationFile) !== "undefined")
        {
            data.append('process_data_application_file', processDataApplicationFile)
        }

        try
        {
            await fetch(constant.baseDomain + "/api/user/statement/contest/" + contest_id,
            {
                method: 'PUT',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    //'Content-Type': 'application/json'
                },
                //redirect: 'follow',
                //referrerPolicy: 'no-referrer',
                body: data
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success")
                {
                    setWarning("Успешно сохранено");
                    
                    ...

                } else if(jsonAnswerStatus.status === "error" && jsonAnswerStatus.errors !== null)
                {
                    setWarning("Ошибка сохранения: " + jsonAnswerStatus.errors);
                } else
                {
                    setWarning("Ошибка сохранения");
                }
            })
            .catch((error) => {
                console.log(error);
                setWarning("Ошибка сохранения");
            })
        } catch(error)
        {
            console.log(error);
            setWarning("Ошибка сохранения");
        } finally
        {
            setIsLoading(false);
        }
    }

    async get(
        jwt, 
        setIsLoading,
        setIsError,
        contest_id,
        setNominationMicroViewModels,
        setUserStatementViewModel,
    ){
        setIsLoading(true);
        setIsError(false);
        try
        {
            await fetch(constant.baseDomain + "/api/user/statement/contest/" + contest_id,
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
                if(jsonAnswerStatus.status === "success" && jsonAnswerStatus.userStatementViewModel !== null)
                {
                    if(jsonAnswerStatus.nominationMicroViewModels !== null)
                    {
                        setNominationMicroViewModels(jsonAnswerStatus.nominationMicroViewModels);
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

    async deleteOtherFile(
        jwt, 
        setIsLoading,
        statement_id,
        file_index,
        getCallback,
    )
    {
        setIsLoading(true);
        try
        {
            await fetch(constant.baseDomain + "/api/user/statement/" + statement_id + "/other_file/" + file_index,
            {
                method: 'DELETE',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                ...
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
        } catch(error)
        {
            setIsLoading(false);
            console.log(error);
        } finally
        {

        }
    }

    async deleteApplicationsAndCharacteristicsFile(
        jwt, 
        setIsLoading,
        statement_id,
        file_index,
        getCallback,
    )
    {
        setIsLoading(true);
        try
        {
            await fetch(constant.baseDomain + "/api/user/statement/" + statement_id + "/applications_and_characteristics_file/" + file_index,
            {
                method: 'DELETE',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                ...
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            })
        } catch(error)
        {
            setIsLoading(false);
            console.log(error);
        } finally
        {

        }
    }
}