import { useEffect, useState } from 'react'
import ZoomProductImage from './ZoomProductImage'
import CheckRole from './CheckRole'
import EditProduct from './EditProduct'
import RemoveProduct from './RemoveProduct'

const ProductList = ({ test, products }) => {


    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            filterProductsFunc(test)
        }
    }, [products, test]);

    const filterProductsFunc = (type) => {
        const filter = products.filter((product) => product.product_type === type)
        setFilteredProducts(filter)
    }

    const [zoomImage, setZoomImage] = useState()
    const [zoomImageOpen, setZoomImageOpen] = useState(false)

    const openZoomImage = (image) => {
        setZoomImage(image)
        setZoomImageOpen(true)
    }

    const [isWindowOpen, setIsWindowOpen] = useState(false)
    const [productInfo, setProductInfo] = useState()

    const openEditWindow = (pInfo) => {
        setIsWindowOpen(true)
        setProductInfo(pInfo)
    }

    return(
        <>
            <div className="product-cards-desktop desktop">
            {
                filteredProducts.map((p) => (
                    <div key={p.product_id} 
                            className="product-card">
                        <div className="product-img" 
                                style={{ backgroundImage: `url(${p.product_img})` }} 
                                onClick={ () => openZoomImage(p.product_img) }></div>
                        <div className="product-name">{p.product_name ? p.product_name : "Ucitava se"}</div>
                        <div className="product-desc">{p.product_desc ? p.product_desc : "Ucitava se"}</div>

                        <CheckRole>
                            <div>
                                <button 
                                    onClick={() => openEditWindow({
                                        id: p.product_id,
                                        img: p.product_img,
                                        name: p.product_name,
                                        desc: p.product_desc
                                    })}>
                                        EDIT
                                </button>
                                <RemoveProduct/>
                             </div>
                        </CheckRole>

                    </div>
                ))
            }
            <EditProduct 
                isWindowOpen={isWindowOpen}
                setIsWindowOpen={setIsWindowOpen}
                productInfo={productInfo}
                setProductInfo={setProductInfo}
            />
            <ZoomProductImage 
                zoomImage={zoomImage} 
                zoomImageOpen={zoomImageOpen} 
                setZoomImageOpen={setZoomImageOpen}
            />
        </div>
        </>
    )
}

export default ProductList