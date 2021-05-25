import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade';
import {Card} from "react-bootstrap";
import '../Css/Cart.css'
import '../Css/Detail.css'

const Commandes=()=> {
     
    const [list,setlist]=useState([])
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')
    const id= sessionStorage.getItem('userInfo')

    useEffect(() => {
       axios.post('https://shop.ndongodahs.fr/api/getCommande',{id})
       .then(res=>{
             setlist(res.data)
       })
       .catch(error=>console.log(error))


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
                        <Card.Img variant="top" src={url+item.image} className='mt-2' />
                        <Card.Body>
                        <Card.Title className='text-primary text-uppercase ha'>{item.title}</Card.Title>
                        <Card.Text>
                        {
                        
                        item.category_id ===1 ?
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <label className='coltail'>Couleur:</label>
                            <span className='color' style={{backgroundColor:item.color}}></span>
                        <label className='coltail'>Taille:</label>
                        <span className='color text-center btn-white'>{item.taile}</span>
                        </div>:''
                    }
                    {
                        item.category_id ===2 ?
                        <div className=''>
                        <label className='coltail'>Taille sélectionnée:</label>
                        <span className='color text-center btn-white'>{item.taile}</span>
                        </div>:''
                    }
                            <span className='font-weight-bold'>Prix:<span className='form-control'> {item.price}€</span></span>
                        </Card.Text>
                        
                        <Card.Text className='font-weight-bold text-justify'>{item.description} </Card.Text>
                        
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
