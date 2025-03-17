import { useState } from 'react'
import { PiXCircleLight } from "react-icons/pi";

const ZoomProductImage = ({ zoomImage, zoomImageOpen, setZoomImageOpen }) => {

    const closeZoomImage = () => {
        setZoomImageOpen(false)
    }

    return(
        <>
        <div className={ 
            zoomImageOpen ?  
            'open-image-wrap-active' : 
            'open-image-wrap'} 
            onClick={() => closeZoomImage()}>

            <div onClick={() => closeZoomImage()} 
                className='close-zoom-div'>
                <PiXCircleLight className='close-zoom'/>
            </div>

            <div className="open-image-div"  
                style={{ 
                backgroundImage: `url(${zoomImage})`
                }}>
            </div>

        </div>
        </>
    )
}

export default ZoomProductImage