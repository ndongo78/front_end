import React,{useState} from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import axios from "axios";
import SimpleMap from './Map';

function Contact() {

    const [email,setemail]=useState('')
    const [sujet,setsujet]=useState('')
    const [message,setmessage]=useState('')
    const [success,setsuccess]=useState('')
    const [error,seterror]=useState('')
     
    

     const handleSubmit=(e)=>{
         e.preventDefault();
            const id= sessionStorage.getItem('userInfo')
            const fd=new FormData()
            fd.append('id',id)
            fd.append('email',email);
            fd.append('object',sujet);
            fd.append('message',message);
            axios.post("https://shop.ndongodahs.fr/api/postMessage",fd)
           .then(res=>{
              setsuccess(res.data.message)
           })
           .catch(error=>{
               seterror(error.response.data.errors)
           })
     }

    return (
        <>
        <div className='container-fluid'>
            <div className='text-center mt-5 mb-5'>
            <h1 className='text-center btn-dark d-block m-auto w-50'>Nous Contacter</h1>
            
            </div>
            <div className="row"  style={{backgroundColor:'inherit'}}>
                <div className="col-md-4 home">
                    <div className='d-flex justify-content-center align-items-center flex-column mt-5 p-1'>
                    <div className='d-flex'>
                        <span><i className="fas fa-home fa-3x mr-3 ic"></i></span>
                        <address>
                         10 rue de bougimont<br/>
                         78130 les Mureaux <br/>
                     </address>
                     </div>
                      <div className='d-flex'>
                          <span><i className="fas fa-mobile-alt fa-3x mr-3 ic"></i></span>
                          <address>
                            0033123344630 <br/>
                            Du Lundi au Samedi <br/>
                            De 9h à 20h
                          </address>
                      </div>
                         <div className='d-flex ml-5'>
                            <span><i className="far fa-envelope fa-3x ic "></i></span>
                            <address className='ml-3'>
                            ndongoshop@yahoo.fr <br/>
                            On vous répond dans les 24h
                            </address>
                         </div>
                    
                    </div> 
                     </div>
                <div className="col-md-8">
                <p className='text-center text-success font-weight-bolder font-italic'>{success}</p>
                    <form className='form-grop font-weight-bolder p-3' onSubmit={handleSubmit}>
                        <div className="form-group w-50 d-block m-auto ">
                        <label htmlFor="nom">Email:</label>
                        <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default"><i className="fas fa-at icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        name='email'
                        placeholder='exemple@yahoo.fr'
                        aria-label="Email"
                        onChange={(e)=>setemail(e.target.value)}
                        />
                        </InputGroup>
                          {
                              error && error.email ? <span className='text-danger'>{error.email}</span>:''
                          }
                        </div>
                        <div className="form-group w-50 d-block m-auto">
                        <label htmlFor="subjet" className='position-relative'>Motif:</label>
                        <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default"><i className="far fa-edit icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        name='motif'
                        placeholder='commande'
                        aria-label="Default"
                        onChange={(e)=>setsujet(e.target.value)}
                        aria-describedby="inputGroup-sizing-default"
                        />
                       </InputGroup>
                       {
                            error && error.object ? <span className='text-danger' >{error.object}</span>:''
                        }
                        </div>
                        <div className="form-group w-50 d-block m-auto">
                            <label htmlFor="message">Message:</label>
                        <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text><i className="far fa-comment-alt icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea"
                         aria-label="With textarea"
                         placeholder='Votre message ici'
                         onChange={(e)=>setmessage(e.target.value)}
                          cols={30} rows={5}
                         /> 
                        </InputGroup>
                        {
                              error && error.message ?<span className='text-danger' >{error.message}</span>:''
                          }
                        </div>
                        <div className="form-group p-2 d-flex justify-content-center">

                        <Button type='submit' name='send' className='btn  btn-block w-25  buton'>Envoyer</Button>
                        <Button type='submit' name='send' className='btn  btn-danger w-25 ml-2  buton'>Annuler</Button>
                        </div>
                    </form>
                </div>
                <div className="col-md-2"> </div>
            </div>
              <div className='d-flex justify-content-center align-items-center'>
                  <SimpleMap />
              </div>
        </div>
           
        </>
    )
}

export default Contact
