
import imgLiga from "../assets/images/liga.png";
import imgGoldenNames from "../assets/images/golden-names.png";
import { useState } from "react";
import ForgetStep0 from "../components/auth/ForgetStep0";
import ForgetStep1 from "../components/auth/ForgetStep1";


export default function ForgetPage()
{
    const [step, setStep] = useState(0);
    const [forgetId, setForgetId] = useState(0);

    document.title = "Восстановление пароля | Лига преподавателей";

    let formContent = "";
    if(step === 0)
    {
        formContent = <ForgetStep0
        setStep={setStep} 
        setForgetId={setForgetId}
        />
    } else
    {
        formContent = <ForgetStep1
        setStep={setStep} 
        forgetId={forgetId}
        />
    }

    return (
        <>
            <div className="row main auth forget">
                <div className="col-3 d-none d-lg-block d-md-block"></div>
                <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                    <div className="block">
                        <div className="row">
                            <div className="col-4">
                                <img src={imgLiga} className="img-fluid" alt="liga-logo" />
                            </div>
                            <div className="col-4">
                                <h3>Восстановление пароля</h3>
                            </div>
                            <div className="col-4 text-right">
                                <img src={imgGoldenNames} className="img-fluid" alt="golden-names-logo" />
                            </div>

                        </div>
                        
                        {formContent}
                    </div>
                </div>
            </div>

        </>
    )
}