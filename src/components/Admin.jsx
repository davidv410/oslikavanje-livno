import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Admin () {

    const [formData, setFormData] = useState({ime: "", sifra: ""})
    const [errors, setErrors] = useState({ime: "", sifra: ""})
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prev => ({...prev, [name]: value }))
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    const submitForm = async (event) => {

        event.preventDefault();

        let newErrors = {}

        if(!formData.ime){newErrors.ime = "Polje je prazno";}
        if(!formData.sifra){newErrors.sifra = "Polje je prazno";}

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
    
            const data = await response.json();

            if(response.ok){
                console.log('Logged in successfully')
                localStorage.setItem("token", data.token);
                navigate("/");
                // Set the token as an HTTP-only cookie
                // response.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

            } else {
                console.log('Login error', data)
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    
    return(
        <>
            <div>
                <form onSubmit={submitForm} method="POST">
                    <input type="text" placeholder="ime" value={formData.ime} name="ime" onChange={handleChange}/>
                    {errors.ime && <p style={{ color: 'red', fontWeight: 'bold' }}>{errors.ime}</p>}
                    <input type="password" placeholder="sifra" value={formData.sifra} name="sifra" onChange={handleChange}/>
                    {errors.sifra && <p style={{ color: 'red', fontWeight: 'bold' }}>{errors.sifra}</p>}
                    <button type="submit">SUBMIT</button>
                </form>                
            </div> 
        </>
    )
}

export default Admin