import React, { forwardRef, useState } from 'react'
import './Contact.css'
import { MapPinArea, Phone , InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Contact = forwardRef((props, ref) => {
    // const containerStyle = {
    //     width: "100%",
    //     height: "100%",
    //     borderRadius: "20px",
    //     border: "2px solid rgb(39, 39, 39)"
    //   };

    //   const mapStyles = [
    //     {
    //       featureType: "all",
    //       elementType: "geometry",
    //       stylers: [{ color: "#15110d" }],
    //     },
    //     {
    //       featureType: "road",
    //       elementType: "geometry",
    //       stylers: [{ color: "#38414e" }],
    //     },
    //     {
    //       featureType: "water",
    //       elementType: "geometry",
    //       stylers: [{ color: "#17263c" }],
    //     },
    //   ];
      
    // const center = {
    // lat: 43.817342, // Replace with your latitude
    // lng: 16.968428, // Replace with your longitude
    // };

    return(
        <>
            <div className="contact-cont-wrap" ref={ref}>
                <div className="contact-cont">
                    <div className="contact-head"><p className='shadow'>KONTAKT</p></div>
                        <div className="contact-info">
                            <div className="contact-info-up">
                                <p className="indent">Za informacije javite se putem</p>
                                <div>
                                <a href="https://www.instagram.com/anica_vrgoc/" target="_blank"><InstagramLogo className="insta-icon"/></a>
                                <a href="https://www.facebook.com/profile.php?id=100009499308964&locale=hr_HR" target="_blank"><FacebookLogo className="face-icon"/></a>
                                </div>
                            </div>
                            <div className="contact-info-down">
                                <div>Ili na broj <span className="number">+387 063 359 970</span></div>
                            </div>
                        </div>
                        <div className="city">LIVNO</div>
                </div>
            </div>
        </>
    )
})


export default Contact