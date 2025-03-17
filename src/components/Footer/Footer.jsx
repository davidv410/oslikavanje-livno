import './Footer.css'
import { InstagramLogo, FacebookLogo } from "@phosphor-icons/react";

function Footer () {
    
    return(
        <>
          <footer>
                <div className='inside-footer-wrap'>
                    <div className='footer-nav'>
                        <li>pocetna</li>
                        <li>proizvodi</li>
                        <li>kontakt</li>
                    </div>
                    
                    <div>
                    © 2025 David Vrgoč
                    </div>
                </div>
          </footer>
        </>
    )
}

export default Footer