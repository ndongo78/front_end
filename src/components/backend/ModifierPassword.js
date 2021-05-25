import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Button, FormControl, InputGroup } from 'react-bootstrap'



export default function ModifierPassword(props) {
   const [user,setuser]= useState([])
   const [password,setpassword]= useState('')
   const [confirm_password,setconfirm_password]= useState([])

    

    useEffect(() => {
        const id=props.match.params.id
        const react_token=props.match.params.react_token
        const headers={
            headers : {
              "react_token" : react_token,
            }
        }

        axios.get(`https://shop.ndongodahs.fr/api/verifyUserForResetPassword/${id}`,headers)
        .then(res=>{
            setuser(res.data)
       } )
        .catch(error=>console.log(error))
    }, [props.match.params.react_token,props.match.params.id])
    
  
 
    const handleChange=(e)=>{
        e.preventDefault();
        const fd=new FormData()
        fd.append('id',user.id)
        fd.append('password',password)
        fd.append('confirm_password',confirm_password)
        const react_token=props.match.params.react_token
        const headers={
            headers : {
              "react_token" : react_token,
            }
        }

        axios.post('https://shop.ndongodahs.fr/api/updateForgotPassword',fd,headers)
        .then(res=>console.log(res.data))
        .catch(error=>console.log(error))
    }
   
    return (
        <div>
            <h1 className='text-center'>Modifier password</h1>

             <form className='form-group' onSubmit={handleChange} >
             <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Mot de pass</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-lock icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="..."
                        aria-label="password"
                        onChange={(e)=>setpassword(e.target.value)}
                        name='password'
                        type='password'
                        />
                    </InputGroup>
                     
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Confirmer mot de pass</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-lock icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="..."
                        aria-label="password"
                        onChange={(e)=>setconfirm_password(e.target.value)}
                        name='confirm_password'
                        type='password'
                        />
                    </InputGroup>
                       
                    </div>
                    <div className='form-group text-center'>
                        <Button type='submit' name='send' className='btn btn-primary p-2 w-25 buton'>S'inscrire</Button>
                        <Button type='reset' name='send' className='btn btn-danger buton ml-3 p-2 w-25'>Annuler</Button>
                       </div>
             </form>
        </div>
    )
}
