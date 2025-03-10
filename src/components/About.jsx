import './About.css'
import { forwardRef } from 'react'

const About = forwardRef((props, ref) => {
    return(
        <>
        <div className='about-wrap'  ref={ref}>
            <div className='about'>
                <div className="about-head">O RADU</div>
                <div className="about-content">
                    <div className='paragraphs-div'>
                        <div>Anica Vrgoč</div>
                        <div className='p-inline'>Posebno oslikane boce, svijeće i čase po narudžbi.</div>
                        <div>
                        Svaki je komad dizajniran da doda osobni pečat vašem domu, događaju ili kao jedinstveni dar.
                        Spoj kreativnosti s umijećem, pretvarajući svakodnevne predmete u smislenu umjetnost.
                        Obraćajući pažnju na detalje i visokokvalitetne materijale,svaki komad je jedinstven i napravljen da traje.
                        </div>
                        <div className='customer-exp'>

                            <div className="customer-exp-one">
                                <div className="num">20</div>
                                <div>godina iskustva</div>
                            </div>

                            <div className="customer-exp-two">
                                <div className="num">3000+</div>
                                <div>zadovoljnih kupaca</div>
                            </div>

                        </div>
                    </div>
                    <div className='img-div'>
                        <div className='filter'>
                            <div style={{ backgroundImage: "url(/proizvodi/aboutslika.jpg)" }} className="about-slika"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
})

export default About