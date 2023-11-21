
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StatementService from "../../services/StatementService";


export function ContestPreview(props)
{
    let linkToStatementNew = "/contest/" + props.id + "/user-statement";

    let contentToStatement = "";
    
    if(props.is_active && !props.user_statement_is_start)
    {
        contentToStatement = <Link to={linkToStatementNew}>Подать заявку</Link>;
    } else if(props.user_statement_is_start && !props.user_statement_is_sent)
    {
        if(props.is_active)
        {
            contentToStatement = <Link to={linkToStatementNew}>Продолжить редактирование</Link>;
        } else
        {
            contentToStatement = <span>Заявка не была отправлена</span>
        }
    } else if(props.user_statement_is_start && props.user_statement_is_sent)
    {
        contentToStatement = <>
        <span>Заявка была отправлена</span>
        <Link to={linkToStatementNew}>Посмотреть отправленную заявку</Link>
        </>
    }

    let btnWithdraw = "";
    if(props.user_statement_is_sent)
    {
        if(props.is_blocked_statement_edit)
        {
            
        } else 
        {
            const statementService = new StatementService();
            btnWithdraw = <>
            <br />
            <Button variant="default" onClick={async() => {
                await statementService.withdraw(
                    props.jwt,
                    props.setIsLoading,
                    props.id,
                    props.listOfContestsCallback
                );
            }}>Отозвать заявку</Button>
            </>
        }
    }

    return(
        <div className="contest-preview">
            <p className="name">{props.name}</p>
            <p className="description">{props.description}</p>
            <div className="statement-status">
                Статус заявки: {contentToStatement}
            </div>
            <div className="contest-statement">
                {props.is_active ? "Прием заявок продолжается" : "Прием заявок завершен"}
                {btnWithdraw}
            </div>
        </div>
    )
}