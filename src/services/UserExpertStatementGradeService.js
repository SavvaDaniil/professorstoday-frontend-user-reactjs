import constant from "../utils/GlobalValues";



export default class UserExpertStatementGradeService
{
    async expertUpdate(
        jwt, 
        setIsLoading, 
        setWarning, 
        userExpertStatementGradeEditViewModel,
    ){
        setIsLoading(true);
        setWarning("Идет сохранение...");

        let data = new FormData()
        for (let key in userExpertStatementGradeEditViewModel ) {
            if(userExpertStatementGradeEditViewModel[key] === "null" || userExpertStatementGradeEditViewModel[key] === null)
            {
                continue;
            }
            data.append(key, userExpertStatementGradeEditViewModel[key]);
        }

        try
        {
            await fetch(constant.baseDomain + "/api/user_expert_statement_grade/expert",
            {
                method: 'PUT',
                headers: {
                    'Authorization' : 'Bearer ' + jwt,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userExpertStatementGradeEditViewModel)
            })
            .then(res => res.json())
            .then((jsonAnswerStatus) => {
                if(jsonAnswerStatus.status === "success")
                {
                    setWarning("Успешно сохранено");

                } else if(...)
                {
                    setWarning("Ошибка сохранения: " + jsonAnswerStatus.errors);
                } else
                {
                    ...
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
}