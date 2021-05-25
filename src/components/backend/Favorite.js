import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade';
import {Card} from "react-bootstrap";
import '../Css/Cart.css'
import '../Css/Detail.css'
import { Link } from 'react-router-dom';

const Commandes=()=> {
     
    const [list,setlist]=useState([])
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')
    const id= sessionStorage.getItem('userInfo')

    useEffect(() => {
       axios.post('https://shop.ndongodahs.fr/api/getFavorite',{id})
       .then(res=>{
             setlist(res.data)
       })
       .catch(error=>error)


    }, [id])

    return (
        <>
        {
            list.length ===0 ? <div className='d-flex justify-content-center align-items-center'>
                  <h1 className='btn btn-dark w-25 mt-4 mb-5 text-center'>Vous n'avez pas de commandes</h1>
            </div>: <div className='container'>
       
       
            <div className='mt-5 mb-5'>
            <h1 className='text-center btn-dark font-weight-bolder w-50 d-block m-auto'>Mes Achats</h1>
          </div>
            <div className='row'>
               {
                        list.map(item=>(
                            <div className='col-md-3'>
                                <Fade left>
                        <Card style={{ position:'relative',marginTop: '.8rem'}} className='text-center mb-3'>

                        {/* <Link to='/'  className='lik btn'>Details</Link> */}

                        <Card.Img variant="top" src={url+item.image} className='mt-2' />
                        <Card.Body>
                        <Card.Title className='text-primary text-uppercase ha'>{item.title}</Card.Title>
                        <Card.Text>
                        
                            <span className='font-weight-bold'>Prix:<span className='form-control'> {item.price}€</span></span>
                        </Card.Text>
                        
                        <Card.Text className='font-weight-bold text-justify'>{item.description} </Card.Text>
                        <div className='d-flex justify-content-center'>
                                    <Link to={`/${item.id}/product`}  className='btn btn-primary buton w-50'> Détails</Link>
                                    </div>
                            </Card.Body>
                        </Card>
                        </Fade>
                        </div>
                              ))
                          }  

            
               </div>
        </div> }
        </>
    )
}

export default Commandes