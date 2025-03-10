import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';

function AddProduct () {

    const [productWindow, setProductWindow] = useState(false)

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
            const response = await fetch("http://localhost:5000/add-product", {
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
                        <option value="Boca">Boca</option>
                        <option value="Svijeca">Svijeca</option>
                        <option value="Casa">Casa</option>
                    </select>

                    <button type='submit'>SUBMIT</button>
                </form>
            </div>
            {
                    isLoggedIn() ? (userInfo.role === 'Admin' ? 
                    (<div>
                            <button onClick={() => openProductWindow()}>ADD</button>
                    </div>) : (null)) : (null)
            }
        </>
    )
}

export default AddProduct