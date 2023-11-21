import { useEffect, useRef, useState } from "react"
import UserMiddleware from "../utils/UserMiddleware";
import StatementService from "../services/StatementService";
import { SystemLoadingPage } from "../components/SystemLoadingPage";
import { SystemErrorPage } from "../components/SystemErrorPage";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import constant from "../utils/GlobalValues";

export function ContestStatementPage(props)
{
    const contest_id = 1;
    const [isLoading, setIsLoading] = useState(true);
    const [isSubLoading, setIsSubLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState();
    const [statementFile, setStatementFile] = useState();
    const [photoFile, setPhotoFile] = useState();
    const [userStatementViewModel, setUserStatementViewModel] = useState(null);
    const [nominationMicroViewModels, setNominationMicroViewModels] = useState([]);
    const [warning, setWarning] = useState("Результат запроса");
    const [statementPage, setStatementPage] = useState(1);

    const inputStatement = useRef();
    const inputPhotoFile = useRef();

    const [applicationsAndCharacteristicFile, setApplicationsAndCharacteristicFile] = useState();
    const inputApplicationsAndCharacteristicFile = useRef();

    const [otherFile, setOtherFile] = useState();
    const inputOtherFile = useRef();

    const [processDataApplicationFile, setProcessDataApplicationFile] = useState(null);
    const navigate = useNavigate();

    let statementsHeaders = [
        "Заявление на участие в конкурсе",
        "Степени и звания",
        "Стаж и дополнительное образование",
        "Общественная и научная активность",
        "Преподавательская деятельность",
        "Прочие данные"
    ];

    const statementService = new StatementService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();

    useEffect(() => {
        setWarning("");
    }, [userStatementViewModel, statementPage]);

    
    const formListener = (e) => {
        let copiedUserStatementViewModel = {...userStatementViewModel};
        copiedUserStatementViewModel[e.target.name] = e.target.value;
        setUserStatementViewModel(() => ({
            ...copiedUserStatementViewModel
        }));
    }

    const handleStatementFile = (e) => {
        if (e.target.files) {
            setStatementFile(e.target.files[0]);
        }
    };
    const handlePhotoFile = (e) => {
        if (e.target.files) {
            setPhotoFile(e.target.files[0]);
        }
    };
    const handleApplicationsAndCharacteristicFileChange = (e) => {
        if (e.target.files) {
            setApplicationsAndCharacteristicFile(e.target.files[0]);
        }
    };
    const handleOtherFileChange = (e) => {
        if (e.target.files) {
            setOtherFile(e.target.files[0]);
        }
    };
    const handleProcessDataApplicationFile = (e) => {
        if (e.target.files) {
            setProcessDataApplicationFile(e.target.files[0]);
        }
    };

    const getCallback = async() => {
        await statementService.get(
            jwt,
            setIsLoading,
            setIsError,
            contest_id,
            setNominationMicroViewModels,
            setUserStatementViewModel
        );
    }

    function changePage(value){
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

    useEffect(() => {

        const userMiddleware = new UserMiddleware();
        const jwt = userMiddleware.getJWTFromCookie();

        async function get(){
            const statementService = new StatementService();
            await statementService.get(
                jwt,
                setIsLoading,
                setIsError,
                contest_id,
                setNominationMicroViewModels,
                setUserStatementViewModel
            );
        }
        get();

        return () => {
            //console.log("useEffect empty");
        }
    }, [])

    if(isLoading)
    {
        return (
            <SystemLoadingPage />
        )
    }

    if(isError)
    {
        return (
            <SystemErrorPage tryAgain={async() => await statementService.get(
                    jwt,
                    setIsLoading,
                    setIsError,
                    contest_id,
                    setNominationMicroViewModels,
                    setUserStatementViewModel
                )
            } />
        )
    }

    let nominationMicroOptions = nominationMicroViewModels.map((nominationMicroViewModel, index) => {
        return <option key={index} value={nominationMicroViewModel.id}>{nominationMicroViewModel.name}</option>
    });

    let hrefToStatementFile = "";
    if(userStatementViewModel.hasOwnProperty("statement_file_src") && userStatementViewModel.statement_file_src !== null && userStatementViewModel.statement_file_src !== "")
    {
        hrefToStatementFile = <span><Link to={constant.baseDomain + "/" + userStatementViewModel.statement_file_src} target="_blank">Загруженное заявление</Link></span>;
    }

    let userPosterImg = "";
    if(userStatementViewModel.hasOwnProperty("photo_file_src") && userStatementViewModel.photo_file_src !== null && userStatementViewModel.photo_file_src !== "")
    {
        userPosterImg = <img className="img-fluid user-poster" src={constant.baseDomain + "/" + userStatementViewModel.photo_file_src} alt="user-poster" />
    }

    let list_of_statement_applications_and_characteristics_files = "";
    let statement_applications_and_characteristics_file_index = 1;
    if(userStatementViewModel.userStatementApplicationsAndCharacteristicsFileViewModels !== null)
    {
        list_of_statement_applications_and_characteristics_files = <ul className="files-list">
            {userStatementViewModel.userStatementApplicationsAndCharacteristicsFileViewModels.map(userStatementApplicationsAndCharacteristicsFileViewModel => {
                if(userStatementViewModel.status === 1)
                {
                    return <li key={userStatementApplicationsAndCharacteristicsFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementApplicationsAndCharacteristicsFileViewModel.src} target="_blank">
                    Файл №{statement_applications_and_characteristics_file_index++}</Link>
                    </li>
                } else
                {
                    return <li key={userStatementApplicationsAndCharacteristicsFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementApplicationsAndCharacteristicsFileViewModel.src} target="_blank">
                    Файл №{statement_applications_and_characteristics_file_index++}</Link> - <Link className="delete" onClick={async() => {
                        await statementService.deleteApplicationsAndCharacteristicsFile(
                            jwt, 
                            setIsLoading,
                            userStatementViewModel.id, 
                            userStatementApplicationsAndCharacteristicsFileViewModel.index,
                            getCallback
                        );
                    }}>удалить</Link>
                    </li>
                }
            })}
        </ul>
    }

    let list_of_other_files = "";
    let other_file_number = 1;
    if(userStatementViewModel.userStatementOtherFileViewModels !== null)
    {
        list_of_other_files = <ul className="files-list">
            {userStatementViewModel.userStatementOtherFileViewModels.map(userStatementOtherFileViewModel => {
                if(userStatementViewModel.status === 1)
                {
                    return <li key={userStatementOtherFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementOtherFileViewModel.src} target="_blank">
                    Файл №{other_file_number++}</Link>
                    </li>;
                } else 
                {
                    return <li key={userStatementOtherFileViewModel.index}>- <Link to={constant.baseDomain + "/" + userStatementOtherFileViewModel.src} target="_blank">
                    Файл №{other_file_number++}</Link> - <Link className="delete" onClick={async() => {
                        await statementService.deleteOtherFile(
                            jwt, 
                            setIsLoading,
                            userStatementViewModel.id, 
                            userStatementOtherFileViewModel.index,
                            getCallback
                        );
                    }}>удалить</Link>
                    </li>;
                }
                
            })}
        </ul>
    }

    let hrefToProcessDataApplicationFile = "";
    if(userStatementViewModel.hasOwnProperty("process_data_application_file_src") && userStatementViewModel.process_data_application_file_src !== null && userStatementViewModel.process_data_application_file_src !== "")
    {
        hrefToProcessDataApplicationFile = <span><Link to={constant.baseDomain + "/" + userStatementViewModel.process_data_application_file_src} target="_blank">Загруженный файл</Link></span>;
    }


    return(
        <form className="profile" encType="multipart/form-data">

            <p className="statement-page-header">Стр. {statementPage}/6 {statementsHeaders[statementPage-1]}</p>

            <div className={"statement-page " + (statementPage === 1 ? "active" : "")}>

                <div className="form-group">
                    <label htmlFor="statement_file">Заявление участника конкурса (Формат JPG, PNG, PDF не более 1МБ)*<br />
                        <a href="/docs/Заявление участника конкурса.docx" target="_blank"> Бланк заявления </a>
                    </label>
                    
                    <br />
                    {hrefToStatementFile}
                    <br />
                    <input type="file" className={"form-control-file " + (userStatementViewModel.status === 1 ? "hide" : "")} name="statement_file" onChange={handleStatementFile} accept="image/png, image/bmp, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" ref={inputStatement} />
                </div>

                <div className="form-group">
                    <label htmlFor="nomination_id">Номинация*</label>
                    <select id="inputOrganization" name="nomination_id" className="form-control" defaultValue={userStatementViewModel.nomination_id} onChange={formListener}>
                        <option value={0}>Выбрать</option>
                        {nominationMicroOptions}
                    </select>
                </div>

                ...

            </div>


            <div className={"statement-page " + (statementPage === 2 ? "active" : "")}>

                <div className="form-group">
                    <label>Образование*</label>
                    <input type="text" name="education" className="form-control" defaultValue={userStatementViewModel.education} onChange={formListener} />
                </div>

                ...

                <div className="form-group">
                    <label>Наличие отраслевых наград, почетных званий и других отличий</label>
                    <input type="text" name="academic_rewards" className="form-control" defaultValue={userStatementViewModel.academic_rewards} onChange={formListener} />
                </div>

            </div>

            
            <div className={"statement-page " + (statementPage === 3 ? "active" : "")}>
                <div className="form-group">
                    <label>Прохождение курсов, стажировок, присвоение степени или звания и других мероприятий повышения квалификации за последние 3 года</label>
                    <input type="text" name="another_courses_and_other" className="form-control" defaultValue={userStatementViewModel.another_courses_and_other} onChange={formListener} />
                </div>
                ...
            </div>


            <div className={"statement-page " + (statementPage === 4 ? "active" : "")}>
                <div className="form-group">
                    <label>Являюсь экспертом (указать организацию и профиль)</label>
                    <input type="text" name="expert_of" className="form-control" defaultValue={userStatementViewModel.expert_of} onChange={formListener} />
                </div>
                ...
            </div>


            <div className={"statement-page " + (statementPage === 5 ? "active" : "")}>
                
                <div className="form-group">
                    <label htmlFor="practice_oriented_teaching">Ведение практико-ориентированной преподавательской деятельности
                    </label>
                    <input type="text" className="form-control" id="practice_oriented_teaching" name="practice_oriented_teaching" defaultValue={userStatementViewModel.practice_oriented_teaching} onChange={formListener} />
                </div>

                ...

            </div>


            <div className={"statement-page " + (statementPage === 6 ? "active" : "")}>

                <div className="form-group">
                    <label htmlFor="other_social_public_educational_work">Прочая социальная, общественная, воспитательная работа</label>
                    <input type="text" className="form-control" id="other_social_public_educational_work" name="other_social_public_educational_work" defaultValue={userStatementViewModel.other_social_public_educational_work} onChange={formListener} />
                </div>
                
                ...


                <div className="form-group">
                    <label htmlFor="applications_and_characteristics_files">
                        Ходатaйства и характеристики по одному до 40 шт. (Формат JPG, PNG, PDF не более 1МБ каждый)
                        <br /> 
                        <Link to="/docs/Образец ходатайства.pdf" target="_blank"> Образец ходатaйства </Link> 
                    </label> 
                    <br />

                    {list_of_statement_applications_and_characteristics_files}

                    <input type="file" className={"form-control-file " + (userStatementViewModel.status === 1 ? "hide" : "")} id="applications_and_characteristics_files" name="applications_and_characteristics_files" accept="image/png, image/bmp, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    ref={inputApplicationsAndCharacteristicFile}
                    onChange={handleApplicationsAndCharacteristicFileChange} />
                </div>

                ...

                <div className="mb-3">
                    <label htmlFor="essay">Эссе (Максимально 5000 символов)</label>
                    <textarea className="form-control " id="essay" maxLength="5000" placeholder="" name="essay" defaultValue={userStatementViewModel.essay} onChange={formListener}></textarea>
                </div>

                <hr />

                <div className="form-group">
                    <p>
                    Просим проверить корректность данных, как должна отображаться запись о Вас в Книге Почета
                    преподавателей вузов Российской Федерации в случае Вашей победы в конкурсе: <br />
                    - Фамилия, Имя, Отчество,<br />
                    - Ученая степень и звание,<br />
                    - Полное наименование ВУЗа,<br />
                    - Город.
                    </p>
                </div>


                <hr />

                <div className="form-group">
                    <label htmlFor="process_data_application_file">Заявление на разрешение обработки персональных данных* (Формат JPG, PNG, PDF не более 1МБ) <Link to="/docs/Согласие на обработку персональных данных.pdf" target="_blank"> Бланк заявления </Link></label> <br />
                    {hrefToProcessDataApplicationFile}
                    <br />
                    <input type="file" className={"form-control-file " + (userStatementViewModel.status === 1 ? "hide" : "")} id="process_data_application_file" name="process_data_application_file" accept="image/png, image/bmp, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleProcessDataApplicationFile} />
                </div>

            </div>

            <div className="statement-control">
                <Button variant={"default " + (statementPage <= 1 || isSubLoading ? "disabled" : "")} disabled={statementPage <= 1 ? "disabled" : ""} onClick={() => changePage(false)}>Пред</Button>
                <Button variant={"default " + (userStatementViewModel.status === 1 ? "hide" : "")} disabled={isLoading || isSaving} onClick={async() => {
                    await statementService.update(
                        jwt,
                        setIsSaving,
                        setWarning,
                        getCallback,
                        contest_id,
                        userStatementViewModel,

                        statementFile,
                        inputStatement,
                        setStatementFile,

                        photoFile,
                        inputPhotoFile,
                        setPhotoFile,

                        applicationsAndCharacteristicFile,
                        inputApplicationsAndCharacteristicFile,
                        setApplicationsAndCharacteristicFile,

                        otherFile,
                        inputOtherFile,
                        setOtherFile,

                        processDataApplicationFile,
                        setProcessDataApplicationFile,
                    )
                }}>Сохранить</Button>
                <Button variant={"default " + (statementPage >= 6 || isSubLoading ? "disabled" : "")} onClick={() => changePage(true)}>След</Button>
                <br />
                <Button variant={"default " + (statementPage < 6 || userStatementViewModel.status === 1 ? "hide" : isSubLoading ? "disabled" : "")} onClick={async() => await statementService.confirm(
                    jwt,
                    isSubLoading,
                    setIsSubLoading,
                    setWarning,
                    userStatementViewModel.id,
                    navigate
                )}>Подать заявку</Button>
                <br />
                <p>{warning}</p>
            </div>

        </form>
    )
}

/*

                <div className="form-group">
                    <label>XXXXXXXXXXXXXX</label>
                    <input type="text" name="XXXXXXXXXXXXXXXXXX" className="form-control" defaultValue={userStatementViewModel.XXXXXXXXXX} />
                </div>
                <div className="form-group">
                    <label>XXXXXXXXXXXXXX</label>
                    <input type="text" name="XXXXXXXXXXXXXXXXXX" className="form-control" defaultValue={userStatementViewModel.XXXXXXXXXX} />
                </div>
                <div className="form-group">
                    <label>XXXXXXXXXXXXXX</label>
                    <input type="text" name="XXXXXXXXXXXXXXXXXX" className="form-control" defaultValue={userStatementViewModel.XXXXXXXXXX} />
                </div>
*/