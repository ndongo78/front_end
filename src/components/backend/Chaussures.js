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
import Vetements from './Vetements';
import Accessoires from './Accessoires';
import NouveauProduit from './NouveauProduit';



const Chaussures=()=> {

    const {chaussure,addCart}=useContext(dataContext1)
    const [products,setproducts]=useState(false)
    const [chaussures,setchaussures]=useState(true)
    const [vetement,setvetement]=useState(false)
    const [accessoire,setaccessoire]=useState(false)
    const [newProduct,setnewProduct]=useState(false)
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')


    const handleAccueil=()=>{
        setproducts(true)
        setchaussures(false)
        setvetement(false)
        setaccessoire(false)
       }

    const handleChaussures=(e)=>{
        setproducts(false)
        setchaussures(true)
        setvetement(false)
        setaccessoire(false)
    }
    
 
    const handleVetement=(e)=>{
     setproducts(false)
     setvetement(true)
     setchaussures(false)
     setaccessoire(false)
 }
 
 const handleAccessoire=(e)=>{
     setproducts(false)
     setaccessoire(true)
     setchaussures(false)
     setvetement(false)
 }
 const handleNewProduct=(e)=>{
    setnewProduct(true)
    setproducts(false)
    setaccessoire(false)
    setchaussures(false)
    setvetement(false)
}

 

    return (
        <>{
            chaussures ?
        <div className='container-fluid ' id="product">
           <ScrollToTop smooth />
           
        <h1 className='text-center font-weight-bolder mt-2 btn-dark rounded-lg mb-5'>Nos Chaussures</h1>
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
                              chaussure.map(item=>(
                                  <div className='col-md-3' key={item.id}>
                                      <Rotate bottom left>
                                <Card style={{ position:'relative',marginTop: '.8rem'}} className='text-center'>

                                {/* <Link to='/'  className='lik btn'>Details</Link> */}
        
                                <Card.Img variant="top" src={url+item.image} className='mt-2' />
                                <Card.Body>
                                <Card.Title className='text-primary text-uppercase ha'>{item.title}</Card.Title>
                                <Card.Text>
                                {
                                    item.category_id===1 ? (
                                        <span className='d-flex'>
                                          <span className=''>
                                            <label>Couleurs:</label>
                                            <span className='d-flex  mt-2'>
                                                <span className='color' style={{backgroundColor:item.colors[0]}} ></span>
                                              <span className='color' style={{backgroundColor:item.colors[1]}}></span>
                                             <span className='color' style={{backgroundColor:item.colors[2]}}></span>
                                            </span>
                                            </span>
                                     <span className='text-center taille '>
                                         <label htmlFor="taille">Pointure</label>
                                     <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                                     <option className='text-center text-dark'>{item.taille[0]}</option>
                                    <option className='text-center text-dark'>{item.taille[1]}</option>
                                     <option className='text-center text-dark'>{item.taille[2]}</option>
                                      </select>
                                      </span>
                                      </span>
                                    
                                    ): ''
                                    }
                                    {
                                            item.category_id===2 ? (
                                             <span>
                                         <label htmlFor="taille" className='text-danger'>Taille</label>
                                         <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                                        <option className='text-center text-dark'>{item.taille[0]}</option>
                                        <option className='text-center text-dark'>{item.taille[1]}</option>
                                        <option className='text-center text-dark'>{item.taille[2]}</option>
                                      </select>
                                             </span>
                                            ):''
                                        }
                                    <span className='font-weight-bold  rounded-lg'>Prix:<span className='form-control'> {item.price}€</span></span>
                                </Card.Text>
                                
                                <Card.Text className='font-weight-bold text-justify'>{item.description} </Card.Text>
                                
                                      <div className='d-flex justify-content-between'>
                                    <button variant="primary" className='prime btn' onClick={()=>addCart(item.id)}>Ajouter au panier</button>
                                    <Link to={`/${item.id}/product`}  className='prime btn'> Détails</Link>
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
                   vetement && <Vetements />
               }
               {
                   accessoire && <Accessoires />
               }
               {
                   newProduct && <NouveauProduit/>
               }
    </>
    )
}

export default Chaussures
