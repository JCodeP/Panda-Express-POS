import React from "react";
import "./Customer.css";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Español' }
}

function Welcome() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const redirect = () => {
        navigate("../menu");
    }

    return(
        <>
            <div className = "ellipse" onClick = {redirect}>
                {t('begin')}
            
            </div>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button type="submit" key={lng} onClick={() => i18next.changeLanguage(lng)} disabled={i18next.resolvedLanguage === lng}>
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
        </>
        
    );
}

export default Welcome;