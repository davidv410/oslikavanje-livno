import React, { useState, useEffect, forwardRef } from 'react'
import './Products.css'
import { PiArrowCircleLeft, PiArrowCircleRight , PiXCircleLight} from "react-icons/pi";
import { jwtDecode } from 'jwt-decode';
import AddProduct from './AddProduct';

const Products = forwardRef((props, ref) => {
    const [productTypes, setProductTypes] = useState([])
    const [products, setProducts] = useState([])

    const [filteredData, setFilteredData] = useState([])
    const [activeType, setActiveType] = useState()

    const [mobileSlide, setMobileSlide] = useState(0)
    const [activeDot, setActiveDot] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const productTypeRes = await fetch(`${import.meta.env.VITE_API_URL}/product-types`)
                const productTypeData = await productTypeRes.json()
                setProductTypes(productTypeData.productTypeData)
        
                const productsRes = await fetch(`${import.meta.env.VITE_API_URL}/products`)
                const productsData = await productsRes.json()
                setProducts(productsData)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        if (productTypes.length > 0 && products.length > 0) {
            selectType(productTypes[0].product_type);
        }
    }, [productTypes, products]); // Depend on both productTypes and products // OVO SKONTAT

    const selectType = (type) => {
        const filter = products.filter((product) => product.product_type === type);
        setFilteredData(filter);
        setActiveType(type);
        setMobileSlide(0)
    };

    const mobileMoveLeft = () => {
        mobileSlide === 0 ? setMobileSlide(filteredData.length - 1) : setMobileSlide(prev => prev - 1 )
        activeDot === 0 ? setActiveDot(filteredData.length - 1) : setActiveDot(prev => prev - 1 )
    }

    const mobileMoveRight = () => {
        mobileSlide < filteredData.length - 1 ? setMobileSlide(prev => prev + 1) : setMobileSlide(0)
        activeDot < filteredData.length - 1 ? setActiveDot(prev => prev + 1) : setActiveDot(0)
    }

    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null
    }

    const getUserInfo = () => {
        const token = localStorage.getItem('token')
        if(token){
            return jwtDecode(token)
        }
        return null
    }

    const userInfo = getUserInfo()

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/remove-products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id})
            })
            const data = await response.json();
            if(response.ok){
                console.log('Product removed')
            }else{
                console.log('Product error', data)
            }
        }catch(error){
            console.log('error', error)
        }
    }

    const editProduct = (id) => {
        console.log(id)
    }


    const mobileDotSelect = (i) => {
        setActiveDot(i)
        setMobileSlide(i)
    }

    const [zoomImageOpen, setZoomImageOpen] = useState(false)
    const [zoomImage, setZoomImage] = useState("")

    const openImage = (id) => {
        setZoomImageOpen(true)
        const chooseImage = filteredData.filter((image) => image.product_id === id)[0]
        setZoomImage(chooseImage.product_img)
        console.log(zoomImage)
    }
    
    const closeZoomImage = () => {
        setZoomImageOpen(false)
        setZoomImage("")
    }   

    return(
        <>
            <div className="products-cont-wrap" 
                 ref={ref}>
                <div className="products-cont">
                    <div className="products-head">
                        <p>PROIZVODI</p>
                        <div className="product-selector">
                            <ul className='product-ul'>
                                { 
                                    productTypes.map((p) => (
                                        <li key={p.product_type} 
                                            onClick={() => selectType(p.product_type)}
                                            className={p.product_type === activeType ? "active" : "inactive"}>
                                            {p.product_type}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    { 
                        isLoading ?
                        'Proizvodi se ucitavaju' :
                        <div className="products-cards-cont">
                        
                        <div className="product-cards-desktop desktop">
                        {
                            filteredData.map((p) => (
                                <div key={p.product_name} 
                                     className="product-card">
                                    <div className="product-img" 
                                         style={{ backgroundImage: `url(proizvodi/${p.product_img})` }} 
                                         onClick={ () => openImage(p.product_id) }></div>
                                    <div className="product-name">{p.product_name ? p.product_name : "Ucitava se"}</div>
                                    <div className="product-desc">{p.product_desc ? p.product_desc : "Ucitava se"}</div>
                                    {
                                        isLoggedIn() ? (userInfo.role === 'Admin' ? 
                                            (<div>
                                                    <button onClick={() => editProduct(p.product_id)}>EDIT</button>
                                                    <button onClick={() => removeProduct(p.product_id)}>REMOVE</button>
                                            </div>) : (null)) : (null)
                                    }
                                </div>
                            ))
                        }
                        </div>

                        <div className={ zoomImageOpen ?  'open-image-wrap-active' : 'open-image-wrap'} 
                             onClick={() => closeZoomImage()}>
                            <div onClick={() => closeZoomImage()} 
                                 className='close-zoom-div'>
                                    <PiXCircleLight className='close-zoom'/>
                            </div>
                            <div className="open-image-div"  
                                 style={{ backgroundImage: `url(proizvodi/${zoomImage})` }}>
                            </div>
                        </div>

                        <div className="product-cards-mobile mobile">
                       
                            <div className="product-img-mob" 
                                 style={{ backgroundImage: `url(proizvodi/${filteredData[mobileSlide] ? filteredData[mobileSlide].product_img : "Ucitava se"})` }}>
                                <div className='mobile-dot-div'>
                                    { 
                                        filteredData.map((p, i) => (
                                            <div key={p.product_id} 
                                                 className={ activeDot === i ? 'active-dot' : 'dot'} 
                                                 onClick={ () => mobileDotSelect(i) }></div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="product-img-mob-low">
                                <div>
                                    <div className="product-name-mob">{filteredData[mobileSlide] ? filteredData[mobileSlide].product_name : "Ucitava se"}</div>
                                    <div className="product-desc-mob">{filteredData[mobileSlide] ? filteredData[mobileSlide].product_desc : "Ucitava se"}</div>
                                </div>
                                <div>
                                  <PiArrowCircleLeft className="arrow-left" onClick={mobileMoveLeft}/>
                                  <PiArrowCircleRight className="arrow-right" onClick={mobileMoveRight}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    }
                   <AddProduct/>
                </div>
            </div>
        </>
    )
})


export default Products