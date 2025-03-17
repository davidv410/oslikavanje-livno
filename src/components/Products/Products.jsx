import React, { useState, useEffect, forwardRef } from 'react'
import './Products.css'
import AddProduct from '../AddProduct/AddProduct';
import ProductList from './ProductList';
import ProductListMobile from './ProductListMobile';
import ProductTypes from './ProductTypes';
import { jwtDecode } from 'jwt-decode';

const Products = forwardRef((props, ref) => {

    const [products, setProducts] = useState([])
    const [test, setTest] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchProducts = await fetch(`${import.meta.env.VITE_API_URL}/products`)
                const fetchProductsData = await fetchProducts.json()
                setProducts(fetchProductsData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return(
        <>
      
            <div className="products-cont-wrap" 
                 ref={ref}>
                <div className="products-cont">
                    <div className="products-head">

                        <p>PROIZVODI</p>

                        <ProductTypes test={test} setTest={setTest}/>

                    </div>

                    <div className="products-cards-cont">

                        <ProductList test={test} products={products}/>
                        <ProductListMobile test={test} products={products}/> 
                
                    </div>

                   <AddProduct/>

                </div>
            </div>
        
        </>
    )
})


export default Products