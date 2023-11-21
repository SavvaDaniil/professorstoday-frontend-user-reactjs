import { useEffect, useState } from "react";
import { ContestPreview } from "../components/contest/ContestPreview";
import UserMiddleware from "../utils/UserMiddleware";
import { SystemLoadingPage } from "../components/SystemLoadingPage";
import { SystemErrorPage } from "../components/SystemErrorPage";
import ContestService from "../services/ContestService";
import { ProfileNotFilledErrorPage } from "../components/ProfileNotFilledErrorPage";
import UserAlreadyWinnerBlock from "../components/UserAlreadyWinnerBlock";


export function ContestsPage(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState();
    const [isProfileNotFilledError, setIsProfileNotFilledError] = useState(false);
    const [isUserAlreadyWinnerError, setIsUserAlreadyWinnerError] = useState(false);
    const [contestUserStatementViewModels, setContestUserStatementViewModels] = useState([]);

    const contestService = new ContestService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();


    const listOfContestsCallback = () => {
        async function listOfContests(){
            const contestService = new ContestService();
            await contestService.list(
                jwt,
                setIsLoading,
                setIsError,
                setIsProfileNotFilledError,
                setIsUserAlreadyWinnerError,
                setContestUserStatementViewModels
            );
        }
        listOfContests();
    }

    useEffect(() => {

        const userMiddleware = new UserMiddleware();
        const jwt = userMiddleware.getJWTFromCookie();

        async function listOfContests(){
            const contestService = new ContestService();
            await contestService.list(
                jwt,
                setIsLoading,
                setIsError,
                setIsProfileNotFilledError,
                setIsUserAlreadyWinnerError,
                setContestUserStatementViewModels
            );
        }
        listOfContests();
        
        return () => {
            
        }
    }, [])

    if(isProfileNotFilledError)
    {
        return <ProfileNotFilledErrorPage />
    }

    if(isUserAlreadyWinnerError)
    {
        return <UserAlreadyWinnerBlock />
    }

    let contestPreviews = contestUserStatementViewModels.map((contestUserStatementViewModel, index) => {
        return <ContestPreview
            key={index}
            id={contestUserStatementViewModel.id}
            name={contestUserStatementViewModel.name}
            description={contestUserStatementViewModel.description}
            is_visible={contestUserStatementViewModel.is_visible}
            is_active={contestUserStatementViewModel.is_active}
            is_blocked_statement_edit={contestUserStatementViewModel.is_blocked_statement_edit}

            user_statement_is_start={contestUserStatementViewModel.user_statement_is_start}
            user_statement_is_sent={contestUserStatementViewModel.user_statement_is_sent}

            jwt={jwt}
            setIsLoading={setIsLoading}
            listOfContestsCallback={listOfContestsCallback}
        />
    });

    if(isLoading)
    {
        return (
            <SystemLoadingPage />
        )
    }

    if(isError)
    {
        return (
            <SystemErrorPage tryAgain={async() => await contestService.list(
                    jwt,
                    setIsLoading,
                    setIsError,
                    setIsProfileNotFilledError,
                    setContestUserStatementViewModels
                )
            } />
        )
    }

    return(
        <>
            {contestPreviews}
        </>
    )
}