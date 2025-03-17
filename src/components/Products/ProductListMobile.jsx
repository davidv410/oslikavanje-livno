import { useEffect, useState } from 'react'
import { PiArrowCircleLeft, PiArrowCircleRight } from "react-icons/pi";

const ProductListMobile = ({ test, products }) => {

    const [filteredProducts, setFilteredProducts] = useState([])
    const [mobileSlide, setMobileSlide] = useState(0)
    const [activeDot, setActiveDot] = useState(0)

    useEffect(() => {
        if (products.length > 0) {
            filterProductsFunc(test)
            setMobileSlide(0)
            setActiveDot(0)
        }
    }, [products, test]);

    const filterProductsFunc = (type) => {
        const filter = products.filter((product) => product.product_type === type)
        setFilteredProducts(filter)
    }

    const mobileMoveLeft = () => {
        setMobileSlide((prev) => (prev === 0 ? prev = filteredProducts.length - 1 : prev - 1))
        setActiveDot((prev) => (prev === 0 ? prev = filteredProducts.length - 1 : prev - 1))
    }

    const mobileMoveRight = () => {
        setMobileSlide((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0))
        setActiveDot((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0))
    }

    const mobileDotSelect = (i) => {
        setMobileSlide(i)
        setActiveDot(i)
    }

    return(
        <>
        <div className="product-cards-mobile mobile">         
            <div className="product-img-mob" 
                    style={{ backgroundImage: `url(${filteredProducts[mobileSlide] ? filteredProducts[mobileSlide].product_img : "Ucitava se"})` }}>
                <div className='mobile-dot-div'>
                    { 
                        filteredProducts.map((p, i) => (
                            <div key={p.product_id} 
                                    className={ activeDot === i ? 'active-dot' : 'dot'} 
                                    onClick={ () => mobileDotSelect(i) }></div>
                        ))
                    }
                </div>
            </div>
            
            <div className="product-img-mob-low">
                <div>
                    <div className="product-name-mob">{filteredProducts[mobileSlide] ? filteredProducts[mobileSlide].product_name : "Ucitava se"}</div>
                    <div className="product-desc-mob">{filteredProducts[mobileSlide] ? filteredProducts[mobileSlide].product_desc : "Ucitava se"}</div>
                </div>
                <div>
                    <PiArrowCircleLeft className="arrow-left" onClick={mobileMoveLeft}/>
                    <PiArrowCircleRight className="arrow-right" onClick={mobileMoveRight}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductListMobile