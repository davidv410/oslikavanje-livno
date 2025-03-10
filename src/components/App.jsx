import React, { useRef } from 'react'
import Header from "./Header"
import LandingPage from "./LandingPage"
import Products from "./Products"
import Contact from "./Contact"
import Footer from './Footer'
import About from './About'

function App() {

  const aboutRef = useRef(null)
  const productsRef = useRef(null)
  const contactRef = useRef(null)

  const menuScrollToFunc = (ref) => {
    if(ref === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      ref.current?.scrollIntoView({ behavior: "smooth" })
    }
  }


  return (
    <>
        <Header menuScrollToFunc={menuScrollToFunc} productsRef={productsRef} contactRef={contactRef} aboutRef={aboutRef}/>
        <LandingPage/>
        <About ref={aboutRef}/>
        <Products ref={productsRef}/>
        <Contact ref={contactRef}/>
        <Footer/>
    </>
  )
}

export default App
