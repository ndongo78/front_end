import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import { dataContext1 } from '../Globals/Global';
import Paypal from './Paypal';


const Payement=()=> {

    const {total,getTotal,cart,increase,reduction,removeProduct,color,taille}=useContext(dataContext1)
   const [redirect, setredirect] = useState(false)
   const [id,setid]=useState('');
   const [message,setmessage]=useState('');
   const [message1,setmessage1]=useState('');
   const [onError]=useState('');
   const [onerror,setonerror]=useState('');
   const [url]=useState('https://shop.ndongodahs.fr/uploads/')
   
  

    useEffect(
        ()=> {
            if(!localStorage.getItem('react_token')){
                setredirect(true)
            }else{
                const iduser= sessionStorage.getItem('userInfo')
                setid(iduser)
            }
          getTotal()
       },[getTotal])

    const handleStripe=(token)=>{}

    console.log(color)
    console.log(taille)

   var tab=[];
    for (let i = 0; i < cart.length; i++) {
        tab.push(cart[i].id) ; 
    }
    
    if(redirect){
        window.confirm(`Veillez vous connecter ou creer de compte pour continuer`)
        return  <Redirect to='/login'/>
      }
      
      const handleSucces=(details,data)=>{        
          setmessage("Merci de votre commande.Vous allez recevoir un email de confirmation");
        
          return(
        axios.post('https://shop.ndongodahs.fr/api/commande',{id,tab,color,taille})
        .then((res)=>{
                 setmessage1(res.data.message)
                
        })
        .catch((error)=>{
            setonerror(error.response.data.error)
             
        })
       ) 
     }


    return (
        <>
        <div className='container mb-4'>
           <div className='row'>
               <div className='d-block m-auto '>
                   <div className='text-center display-none' style={{display:'hidden'}}>
                       <p className='text-center text-success font-weight-bolder'>{message1}</p>
                       <p className='text-center text-danfer font-weight-bolder'>{onerror}</p>
                   </div>
                   <div className='alert alert-success text-center font-italic font-weight-bold'>{message}</div>
                   <div className='alert alert-danger text-center font-italic font-weight-bold'>{onError} </div>
               <h1 className='text-dark bg-light text-center'>Récapitulatif de votre Commande</h1>
               {
                cart.map(item=>(
                    
                    <div className='details cart shadow' key={item.id}>
                        
                        <img src={url+item.image} alt='' />
                        <div className="box">
                            <div className="row">
                                <h2>{item.title}</h2>
                                <span className='font-weight-bolder mr-5 amount'>{item.price * item.quantite}€</span>
                            </div>
                            <p>{item.description}</p>
                            <div>
                                {
                                    item.category_id ===1 ?
                                    <div>
                                        <label className='coltail'>Couleur sélectionnée:</label>
                                      <span className='color' style={{backgroundColor:color}}></span>
                                     <label className='coltail'>Taille sélectionnée:</label>
                                    <span className='color text-center btn-white'>{taille}</span>
                                    </div>:''
                                }
                                {
                                    item.category_id ===2 ?
                                    <div>
                                    <label className='coltail'>Taille sélectionnée:</label>
                                    <span className='color text-center btn-white'>{taille}</span>
                                    </div>:''
                                }
                                
                                
                            </div>
                            <div className="count mt-3">
                                <button onClick={()=>increase(item.id)} className='btn-sm rounded-lg btn-primary font-weight-bolder'>+</button>
                                          <span className='ml-1'>{item.quantite}</span>
                                <button onClick={()=>reduction(item.id)} className='rounded-lg btn-sm btn-danger font-weight-bolder ml-2'>-</button>
                                <button className='delete' onClick={()=>removeProduct(item.id)}>X</button>
                            </div>
                        </div>
                    </div>
                ))
            }

               </div>

           </div>
           </div>
            <div className=" shadow mb-3 mt-5 container">
                <div className='row text-center mt-3'>
                <div className="col-md-4 sm-col-12 mt-5 text-center">
                    <StripeCheckout stripeKey={'pk_test_51Ha3LfL35VcVkQhY0ivTQQ2DsMt58gABJyHFYCYwKaAUlhHKV3C4oaduF3ILxlX4gLaVeYfNQMhoBcB05CXzi2sc00NFArSKh4'}
                        token={handleStripe}
                        billingAddress
                        amount={getTotal * 100}
                        name='Votre Commande'
                    > <button className='btn btn-dark d-flex justify-content-between mt-1'>
                        Carte bancaire
                        <svg width="1.8em" height="1.7em" viewBox="0 0 16 16" className="bi bi-credit-card " fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                  </svg></button></StripeCheckout>
                </div>
                  <div className='col-md-4 sm-col-12 mt-3'>
                      <Link to='/paypal'>
                  <Paypal total={total} items={cart}  onSuccess={handleSucces}  className='bg-dark' />
                  </Link>
                  </div>
                  <div className='col-md-4 sm-col-12 mt-5'>
                <h3 className='somme'>Total: {total}€</h3>
                </div>
            </div>
            </div>
        </>
    )
}

export default Payement
