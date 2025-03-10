import React, { useState } from 'react'
import './Header.css';
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { CaretDoubleUp } from "@phosphor-icons/react";
import { jwtDecode } from 'jwt-decode';


function Header ({ menuScrollToFunc, productsRef, contactRef, aboutRef }) {

    const [isOpen, setIsOpen] = useState(false)

    const openMenu = () => {
        setIsOpen(!isOpen)
    }

    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    }

    const getUserInfo = () => {
        const token = localStorage.getItem('token')
        if(token){return jwtDecode(token)}
        return null
    }

    const userInfo = getUserInfo()

    return(
        <>
            <div className="header-wrap">
                <div className="header-wrap-inside">
                    <h1 className="header-title">ANICA VRGOČ</h1>
                    <div>
                    <button className="header-btn" onClick={() => menuScrollToFunc(aboutRef)}>o radu</button>
                    <button className="header-btn" onClick={() => menuScrollToFunc(productsRef)}>proizvodi</button>
                    <button className=" kontakt-btn" onClick={() => menuScrollToFunc(contactRef)}>kontakt</button>
                    <button className="ham-menu" onClick={openMenu}><HiOutlineMenuAlt4 size={25}/></button>
                    </div>
                </div>
                
                <div>
                        { isLoggedIn() ? (
                            <div className='admin'>
                                <div>{userInfo?.role}</div>
                                <button onClick={() => localStorage.removeItem('token')}>LOGOUT</button>
                            </div>
                        ) : (
                            null
                        )}
                </div>
            </div>

            <div className={ isOpen ? "active-menu" : "dropdown-menu"}>
                <ul className="dropdown-menu-ul">
                    <li className="dropdown-menu-li" onClick={() => menuScrollToFunc(aboutRef)}>o radu</li>
                    <li className="dropdown-menu-li" onClick={() => menuScrollToFunc(productsRef)}>proizvodi</li>
                    <li className="dropdown-menu-li" onClick={() => menuScrollToFunc(contactRef)}>kontakt</li>
                    <li className="dropdown-menu-li" onClick={openMenu}><IoClose/></li>
                </ul>
            </div>
            {/* <CaretDoubleUp size={32} className='back-to-top' style={{ position: "fixed", right: "2px", bottom: "20px", cursor: "pointer"}}/> */}
        </>
    )
}

export default Header