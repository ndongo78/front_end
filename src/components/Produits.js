import React, { useContext,useState,useEffect} from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Zoom from 'react-reveal/Zoom';
import Typical from 'react-typical'
import './Css/Product.css'
import { dataContext1 } from './Globals/Global';
import Chaussures from '../components/backend/Chaussures';
import Vetements from './backend/Vetements';
import Accessoires from './backend/Accessoires';
import ScrollToTop from "react-scroll-to-top";
import axios from 'axios'
import shoes from '../components/images/shoes.svg'
import vest from '../components/images/vest.svg'
import back from '../components/images/sport-bag.svg'
import back1 from '../components/images/new-products-label.svg'
import NouveauProduit from './backend/NouveauProduit';




const Products=()=> {


   const {product,addCart}=useContext(dataContext1)
   const [products,setproducts]=useState(true)
   const [chaussures,setchaussures]=useState(false)
   const [vetement,setvetement]=useState(false)
   const [accessoire,setaccessoire]=useState(false)
   const [newProduct,setnewProduct]=useState(false)
   const [favoris,setfavoris]=useState([])
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')
    const idUser=sessionStorage.getItem('userInfo')
    
  const addAfavoris=(id)=>{
      setfavoris(id)
        if(id){
            sessionStorage.setItem('fav',JSON.stringify(id) )
        }
        if(idUser){
             
            const article_id=id.id;
            axios.post('https://shop.ndongodahs.fr/api/postFavorite',{idUser,article_id})
            .then(res=>
            {
                alert(res.data.success)
            })
             .catch(error=>{
                        
             })
        }else{
            sessionStorage.setItem('fav',JSON.stringify(id) )
        }
        
       
  
}


useEffect(()=>{
   
     const savedFavorite= sessionStorage.getItem('fav');
     
     if(savedFavorite){
         setfavoris(JSON.parse(savedFavorite))
     }


},[]);

   const handleAccueil=()=>{
    setproducts(true)
    setchaussures(false)
    setvetement(false)
    setaccessoire(false)
    setnewProduct(false)
   }

   const handleChaussures=(e)=>{
       setproducts(false)
       setchaussures(true)
       setvetement(false)
       setaccessoire(false)
       setnewProduct(false)
   }
   

   const handleVetement=(e)=>{
    setproducts(false)
    setvetement(true)
    setchaussures(false)
    setaccessoire(false)
    setnewProduct(false)
}

const handleAccessoire=(e)=>{
    setproducts(false)
    setaccessoire(true)
    setchaussures(false)
    setvetement(false)
    setnewProduct(false)
}
const handleNewProduct=(e)=>{
    setnewProduct(true)
    setproducts(false)
    setaccessoire(false)
    setchaussures(false)
    setvetement(false)
    
}


    return (
          <> {
              products ?  
             
        <div className='container-fluid '> 
        <ScrollToTop smooth />
              <h1 className='text-center font-weight-bolder mt-2 btn-dark rounded-lg mb-5'>Nos Produits</h1>
               <div className='row mt-5 mb-5 '>
               <div className='col-md-3'>
                   <ul className='list-group h-75'>
                          <h2 className='list-group-item'>Catégories</h2>
                          <li className='list-group-item' onClick={handleAccueil}>
                          <span><i className="fas fa-home mr-3 fa-2x" style={{backgroundColor: "rgb(115, 115, 252)"}}></i></span>
                           <span className='ml-5 font-weight-bolder font-italic text-uppercase' >Accueil</span>
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
                       <Typical
                        steps={['20%', 1000, 'de remise pour tous nos produits', 500]}
                        loop={Infinity}
                        wrapper="p"
                        className='ml-3 text-danger'
                        />
                      </div>
                          {
                              product.map(item=>(
                                  <div className='col-md-3' key={item.id}>
                                       <Zoom left>
                                <Card style={{ position:'relative',marginTop: '.8rem'}} className='text-center'>        
                                <Card.Img variant="top" src={url+item.image} className='mt-2' />
                                <Card.Body>
                                <Card.Title className='text-primary text-uppercase ha'>{item.title}</Card.Title>
                                <span className='float-right fav' >
                                     {
                                        item.id===favoris.id ?<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" onClick={()=>addAfavoris(item)} className="bi bi-suit-heart-fill mr-2" fill='red' xmlns="http://www.w3.org/2000/svg">
                                         <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                          </svg>:<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" onClick={()=>addAfavoris(item)} className="bi bi-suit-heart-fill mr-2" fill='black' xmlns="http://www.w3.org/2000/svg">
                                 <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                                  </svg>
                                     }
                                 </span>
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
                                    <span className='font-weight-bold'>Prix:<span className='form-control'> {item.price}€</span></span>
                                </Card.Text>
                                
                                <Card.Text className='font-weight-bold text-justify'>{item.description} </Card.Text>
                                
                                      <div className='d-flex justify-content-between'>
                                    <Button variant="primary" className='prime btn' onClick={()=>addCart(item.id)}>Ajouter au panier</Button>
                                    <Link to={`/${item.id}/product`}  className='prime btn btn-primary'> Détails</Link>
                                    </div>
                                  </Card.Body>
                                </Card>
                                </Zoom>
                                </div>
                              ))
                          }  
                 </div>
                 </div>  :'' }
                   {
                    chaussures ? 
                    <Chaussures/> 
                    : null
                    }
                    {
                    vetement ? <Vetements /> :""
                }
                {
                    accessoire ? <Accessoires/>:""
                }
                {
                    newProduct && <NouveauProduit />
                }
            </> 
    );
}


export default Products;

