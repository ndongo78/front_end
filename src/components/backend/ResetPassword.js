import React,{useState,useEffect} from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import axios from 'axios'


function ResetPassword() {
   
    const [email,setemail]=useState('')

    useEffect(() => {
        axios.get('https://shop.ndongodahs.fr/api/resetPassword',{email})
        .then(res=>{
               console.log(res.data)
           
              
           
        })
        .catch(error=>{
           console.log(error)

        })
    }, [email])

         const handleSubmit=(e)=>{
         e.preventDefault();
         axios.post('https://shop.ndongodahs.fr/api/resetPassword',{email})
         .then(res=>{
                console.log(res.data)
            
               
            
         })
         .catch(error=>{
            console.log(error)

         })
        setemail('')
     }

    return(
        <div className='container'>
            <form className='form-group' onSubmit={handleSubmit}>
                    <h1 className='text-center text-primary mt-5 mb-5 '>Réinitialiser votre mot de pass</h1>          
                {/* <div className='text-center font-weight-bolder font-italic text-danger'>{error}</div> */}
                <div className='form-group  d-block m-auto w-50'>
                 <label htmlFor='email' >Votre email</label>
                   <InputGroup className='formInput '>
                    <InputGroup.Prepend>
                   <InputGroup.Text id="basic-addon1"><i className="fas fa-at icones"></i></InputGroup.Text>
                   </InputGroup.Prepend>
                  <FormControl 
                   placeholder="example@yahoo.fr"
                   aria-label="Email"
                   name='email'
                   onChange={(e)=>setemail(e.target.value)}
                   type='email'
                   value={email}
                   />
                   </InputGroup>
                   {/* {
                       errors && errors.email ? <span className='text-danger' >{errors.email}</span>:''
                   } */}
                </div>
                 <div className='d-flex justify-content-center'>
                    <Button variant='primary' type='submit' className='buton mr-5'>Valider</Button> 
                    <Button variant='danger' type='reset' className='buton'>Annuler</Button> 
                 </div>
            </form>
        </div>
    )
    
}

export default ResetPassword;


