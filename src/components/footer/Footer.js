import React,{useState} from 'react';
import { FormControl, InputGroup } from 'react-bootstrap'
import {Link} from "react-router-dom";
import pdf from './Mentions legal.pdf'
import pdf1 from './Mentions legal.pdf'
import pdf2 from './propos.pdf'
import axios from "axios";


const Footer=()=> {

    const [email,setemail]=useState('')
    
    const [error,seterror]=useState('')
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const fd=new FormData()
      
        fd.append('email',email);
        axios.post("https://shop.ndongodahs.fr/api/newletter",fd)
       .then(res=>{
        alert(res.data.message)
       })
       .catch(error=>{
        seterror(error.response.data.errors)
       })
    }

        return (
            <div className='container-fluid  footer  text-white'>
            <div className="row contain" style={{backgroundColor:'#000'}}>
            <div className="col-md-3 text-center mt-4 p-3 d-flex flex-column p-2 contain">
                    <h3>Catégory</h3>
                    <Link to='/chaussure' className='text-white' >Chaussures</Link>
                    <Link to='/vetement' className='text-white' >Vétements</Link>
                    <Link to='/accessoire' className='text-white' >Accéssoires Mode</Link>
                </div>
                <div className="col-md-3 d-flex flex-column  mt-4 p-3 " style={{backgroundColor:'#000'}}>
                    <h3 className='font-weight-bold text-white'>Ndongo Shop</h3>
                    <Link to={pdf2} target='_blank' ><span className='btn-link text-white'>A propos</span></Link>
                    <Link to={pdf1} target='_blank' ><span className='btn-link text-white'>Mentions légales</span></Link>
                    <Link to={pdf} target='_blank' ><span className='btn-link text-white'>Conditions général</span></Link>
                    <Link to={pdf} target='_blank' ><span className='btn-link text-white'> Protection des données Personel</span></Link>
                    <Link to="/contact"  ><span className='btn-link text-white'> Contact</span></Link>
                </div>
                <div className='col-md-3 mt-4 p-3' style={{backgroundColor:"#000"}}>
                    <h3>Addresse</h3>
                     <address>
                         10 rue de bougimont<br/>
                         78130 les Mureaux <br/>
                         0123344630 <br/>
                         ndongoshop@yahoo.fr
                     </address>
                </div>
               
                <div className="col-md-3 mt-4 p-3" style={{backgroundColor:'#000'}}>
                    <h3 className='text-center font-weight-bold text-white'>Recevoir les bons plans</h3>
                    {
                        error && error.email ? <span className='text-danger'>{error.email}</span>:''
                    }
                    <InputGroup className='mt-3 mr-3 searc '>
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e)=>setemail(e.target.value)}
                    value={email}
                    />
                   
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default" className='fa-search bg-primary' onClick={handleSubmit}><span className='fa-search'><i className="fas fa-search"></i></span></InputGroup.Text>
                    </InputGroup.Prepend>
                </InputGroup>
                    <div className='mt-4 d-flex'>
                        <div className='fIcone'><Link to='' ><i className="fab fa-facebook-f text-white "></i></Link></div>
                        <div className='fIcone'><Link to='' ><i className="fab fa-twitter text-white "></i></Link></div> 
                        <div className='fIcone'><Link to='' ><i className="fab fa-instagram text-white "></i></Link></div> 
                        <div className='fIcone'><Link to='' ><i className="fab fa-whatsapp text-white "></i></Link></div>
                       
                    </div>
                </div>
                  <div className='col-md-9'></div>
                <div className='d-flex col-md-3 float-right ' style={{backgroundColor:"#000"}}>
                    <i className="far fa-copyright" style={{color:'white'}}></i>
                    <p className='text-white font-weight-bolder font-italic'>Made by Ndongo 2020</p>
                </div>
                </div> 
            </div>
        );
    }


export default Footer;