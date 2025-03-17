import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import CheckRole from '../Products/CheckRole';

function AddProduct () {

    const [productWindow, setProductWindow] = useState(false)

    const openProductWindow = () => {
        setProductWindow(!productWindow)
    }

    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        type: ""
    })

    const [imageData, setImageData] = useState(null)

    const handleChange = (e) => {
        const { name, value, files, type } = e.target

        if(type === 'file'){
            setImageData(files[0])
        }else{
            setFormData(prev => ({...prev, [name]: value}))
        }
    }

    const addProductFunc = async (e) => {
        e.preventDefault()

        const productData = new FormData()
        productData.append('name', formData.name)
        productData.append('desc', formData.desc)
        productData.append('type', formData.type)
        if (imageData) {
            productData.append('img', imageData)
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-product`, {
                method: 'POST',
                body: productData
            })

            const data = await response.json()
            if(response.ok){
                console.log('product added', data)
            }else{
                console.log('something went to shit')
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return(
        <>
            <div className={productWindow ? 'add-product-div-active' : 'add-product-div'}>
                <form action="" method='POST' onSubmit={addProductFunc}>
                    
                    <input type="text" name="name" placeholder='ime' value={formData.name} onChange={handleChange}/>
                    
                    <input type="text" name="desc" placeholder='desc' value={formData.desc} onChange={handleChange}/>
              
                    <input type="file" name="img" onChange={handleChange} accept="image/*" placeholder='img'/>

                    <select name="type" onChange={handleChange} value={formData.type}>
                        <option value="">Select type</option>
                        <option value="Boce">Boce</option>
                        <option value="Svijece">Svijece</option>
                        <option value="Case">Case</option>
                    </select>

                    <button type='submit'>SUBMIT</button>
                </form>
            </div>
            <CheckRole>
                <button onClick={() => openProductWindow()}>ADD</button>
            </CheckRole>
        </>
    )
}

export default AddProduct