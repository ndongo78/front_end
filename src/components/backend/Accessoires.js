import React,{useContext,useState} from 'react'
import { Link } from 'react-router-dom'
import { dataContext1 } from '../Globals/Global'
import ScrollToTop from "react-scroll-to-top";
import Rotate from 'react-reveal/Rotate';
import {Card} from "react-bootstrap";
import shoes from '../images/shoes.svg'
import vest from '../images/vest.svg'
import back from '../images/sport-bag.svg'
import back1 from '../images/new-products-label.svg'
import Products from '../Produits';
import Chaussures from './Chaussures';
import Vetements from './Vetements';
import NouveauProduit from './NouveauProduit';

const Accessoires=()=> {

    const {accessoire,addCart}=useContext(dataContext1)
    const [products,setproducts]=useState(false)
    const [chaussures,setchaussures]=useState(false)
    const [vetements,setvetements]=useState(false)
    const [accessoir,setaccessoire]=useState(true)
    const [newProduct,setnewProduct]=useState(false)
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')

    const handleAccueil=()=>{
        setproducts(true)
        setchaussures(false)
        setvetements(false)
        setaccessoire(false)
       }

    const handleChaussures=(e)=>{
        setproducts(false)
        setchaussures(true)
        setvetements(false)
        setaccessoire(false)
    }
    
 
    const handleVetement=(e)=>{
     setproducts(false)
     setvetements(true)
     setchaussures(false)
     setaccessoire(false)
 }
 
 const handleAccessoire=(e)=>{
     setproducts(false)
     setaccessoire(true)
     setchaussures(false)
     setvetements(false)
 }
 const handleNewProduct=(e)=>{
    setnewProduct(true)
    setproducts(false)
    setaccessoire(false)
    setchaussures(false)
    setvetements(false)
}

    return (
        <>
        {
            accessoir ?
        
        <div className='container-fluid ' id="product">
          <ScrollToTop smooth />
        <h1 className='text-center font-weight-bolder mt-2 btn-dark rounded-lg mb-5'>Nos Accessoires Mode</h1>
        <div className="row">
        <div className='col-md-3'>
                   <ul className='list-group h-75'>
                          <h2 className='list-group-item'>Catégories</h2>
                          <li className='list-group-item' onClick={handleAccueil}>
                          <span><i className="fas fa-home mr-3 fa-2x" style={{backgroundColor: "rgb(115, 115, 252)"}}></i></span>
                           <span className='ml-5 font-weight-bolder font-italic text-uppercase'>Accueil</span>
                          </li>
                          <li className='list-group-item' onClick={handleChaussures}>
                              <span><img src={shoes} alt='' className='shoes mr-3'/></span>
                             <span className='ml-5 font-weight-bolder font-italic text-uppercase'>Chaussures</span>
                              </li>
                          <li className='list-group-item' onClick={handleVetement}>
                              <span><img src={vest} alt='' className='shoes mr-3'/></span>
                              <span className='ml-5 font-weight-bolder font-italic text-uppercase'>Vétements</span>
                              </li>
                          <li className='list-group-item' onClick={handleAccessoire}>
                          <span><img src={back} alt='' className='shoes mr-3'/></span>
                          <span className='ml-5 font-weight-bolder font-italic text-uppercase'> Accéssoires</span>
                         </li>
                         <li className='list-group-item' onClick={handleNewProduct}>
                          <span><img src={back1} alt='' className='shoes mr-1'/></span>
                          <span className='ml-5 font-weight-bolder font-italic text-uppercase'>Nouveaux Produits</span>
                         </li>
                      </ul>
                      </div>
                          {
                              accessoire.map(item=>(
                                  <div className='col-md-3' key={item.id}>
                                      <Rotate top left>
                                <Card style={{ position:'relative',marginTop: '.8rem'}} className='text-center'>
                                <Card.Img variant="top" src={url+item.image} className='mt-2' />
                                <Card.Body>
                                <Card.Title className='text-primary text-uppercase ha'>{item.title}</Card.Title>
                                <Card.Text>
                                    <span className='font-weight-bold  rounded-lg'>Prix:<span className='form-control'> {item.price}€</span></span>
                                </Card.Text>
                                
                                <Card.Text className='font-weight-bold text-justify'>{item.description} </Card.Text>
                                
                                      <div className='d-flex justify-content-between'>
                                    <button variant="primary" className='prime btn' onClick={()=>addCart(item.id)}>Ajouter au panier</button>
                                    <Link to={`/${item.id}/product`} className='prime btn'> Détails</Link>
                                    </div>
                                  </Card.Body>
                                </Card>
                                </Rotate>
                                </div>
                              ))
                          }
                          </div>
    </div>:""}
             {
                 products && <Products/>
             }
             {
                 vetements && <Vetements/>
             }
             {
                 chaussures && <Chaussures />
             }
             {
                newProduct && <NouveauProduit/>
             }
    </>
    )
}

export default Accessoires
