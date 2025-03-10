import './LandingPage.css'
import landingCover from '../assets/landing-cover.jpg'
import { PiArrowCircleDown } from "react-icons/pi";


function LandingPage () {
    return(
        <>
            <div className="landing-page-cont">
                <div className="landing-page-img" style={{ backgroundImage: `url(${landingCover})` }}>
                    <div className='filter-dark'></div>
                   
                    <div className="landing-page-text">
                        OSLIKAVANJE BOCA SVIJEĆA ČASA
                    </div>
                    <div className="landing-page-text-small">
                        Po narudžbi
                    </div>
                  
                </div>
            </div>
        </>
    )
}

export default LandingPage