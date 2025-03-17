import { useState } from 'react'
import './ProductFunctions.css'

const EditProduct = ({ isWindowOpen, setIsWindowOpen, productInfo, setProductInfo }) => {


    const closeWindow = () => {
        setIsWindowOpen(false)
        setProductInfo("")
    }

    const [form, setFormData] = useState({
        img:  "",
        name: "",
        desc: ""
    })

    const [imageData, setImageData] = useState(null)

    const handleChange = (event) => {
        const { id, name, value, files, type } = event.target
        if(type === 'file'){
            setImageData(files[0])
        }else{
            setProductInfo({ ...productInfo, [name]: value })
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        const bundleData = new FormData()

        bundleData.append('id', productInfo.id)
        bundleData.append('name', productInfo.name)
        bundleData.append('desc', productInfo.desc)
        
        if (imageData) {
            bundleData.append('img', imageData)
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/update-product`, {
                method: 'POST',
                body: bundleData
            })

            const data = await response.json()
            if(response.ok){
                console.log('product updated', data)
            }else{
                console.log('something went to shit', data)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return(
        <>

            <div className={`edit-window ${isWindowOpen ? 'edit-window-open': ''}`}>
                {productInfo ? 
                
                    <div>
                        <p name="id">id: {productInfo.id}</p>
                        <div style={{ backgroundImage: `url(${productInfo.img})`, width:"120px", height:"120px", backgroundSize: "cover" }}></div>
                        <input name="img"  onChange={handleChange} type='file' accept="image/*"/><br />
                        <input name="name" value={productInfo.name} onChange={handleChange}/><br />
                        <input name="desc" value={productInfo.desc} onChange={handleChange}/><br />
                        <button type='submit' onClick={updateProduct}>SUBMIT</button>
                    </div>
                   
                : null}
                <button onClick={() => closeWindow()}>CLOSE</button>
            </div>
  
        </>
    )

}

export default EditProduct