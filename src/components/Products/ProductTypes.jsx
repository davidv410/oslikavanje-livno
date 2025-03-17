import { useEffect, useState } from 'react'
import Products from "./Products"



const ProductTypes =  ({ test, setTest }) => {

    const [productTypes, setProductTypes] = useState([])
    const [activeType, setActiveType] = useState()
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const productTypesFetch = await fetch(`${import.meta.env.VITE_API_URL}/product-types`)
                const productTypesData = await productTypesFetch.json()
                setProductTypes(productTypesData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (productTypes.length > 0) {
            selectType(productTypes[0].product_type);
        }
    }, [productTypes]); // Depend on productTypes // OVO SKONTAT

    const selectType = (type) => {
        setActiveType(type)
        setTest(type)

        
    }

    return(
        <>
            <div className="product-selector">
                <ul className='product-ul'>
                    { 
                        productTypes.map((p) => (
                            <li key={p.product_type} 
                                onClick={() => selectType(p.product_type)}
                                className={p.product_type === activeType ? "active" : "inactive"}
                                >
                                {p.product_type}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default ProductTypes