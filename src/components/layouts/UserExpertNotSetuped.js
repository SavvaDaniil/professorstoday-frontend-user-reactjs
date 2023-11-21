import { useState } from "react";
import UserService from "../../services/UserService";
import UserMiddleware from "../../utils/UserMiddleware";

export default function UserExpertNotSetuped(props)
{
    const [isLoading, setIsLoading] = useState(false);
    const [nominationIds, setNominationIds] = useState(new Set());
    const [warning, setWarning] = useState("");
    
    const userService = new UserService();
    const userMiddleware = new UserMiddleware();
    const jwt = userMiddleware.getJWTFromCookie();

    const expertSetup = async() => {
        if(nominationIds === null || nominationIds.size === 0)
        {
            setWarning("Выберите хотя бы одну номинацию");
            return;
        }
        await userService.expertSetup(
            jwt,
            setIsLoading,
            setWarning,
            Array.from(nominationIds)
        )
    }

    const checkboxListener = (e) => {
        setWarning("");
        let copiedNominationIds = nominationIds;
        if(e.target.checked)
        {
            copiedNominationIds.add(parseInt(e.target.value, 10));
        } else
        {
            copiedNominationIds.delete(parseInt(e.target.value), 10);
        }
        setNominationIds(copiedNominationIds);
    }

    const confirmChosenNominations = () => {
        console.log(nominationIds);
        expertSetup();
    }

    if(props.nominationMicroViewModels == null)
    {
        return <></>
    }

    const nominationMicroCheckbox = props.nominationMicroViewModels.map((nominationMicroViewModel, index) => {
        return <div className="form-check" key={index}>
            <input className="form-check-input" type="checkbox" value={nominationMicroViewModel.id} id={"checkbox-" + nominationMicroViewModel.name} onChange={checkboxListener} disabled={isLoading} />
            <label className="form-check-label" htmlFor={"checkbox-" + nominationMicroViewModel.name}>
                {nominationMicroViewModel.name}
            </label>
        </div>
    });
    
    return(
        <div className="choose nominations">
            <h3>Настройка экспертов: выбор заявок</h3>
            <p>Выберите пожалуйста номинации, по которым вы будете рассматривать заявки.</p>
            <hr />
            {nominationMicroCheckbox}
            <hr />
            <div className="text-center">
                <button className="btn" onClick={confirmChosenNominations} disabled={isLoading}>Утвердить выбор</button>
                <p className="warning">{warning}</p>
            </div>
        </div>
    )
}