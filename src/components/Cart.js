import React, {useContext,useState,useEffect} from 'react'
import '../components/Css/Detail.css'
import '../components/Css/Cart.css'
import { dataContext1 } from './Globals/Global';
import { Link } from 'react-router-dom';



const  Cart=(props)=> {

    const {getTotal,total,cart,reduction,increase,removeProduct,handleColor,handleTaille} =useContext(dataContext1)
    
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')

    useEffect(() => {
       
        getTotal()
    }, [getTotal])

 


    return (
        <div className='container contCart'>
            <div className='text-center'>
            {
                cart.length ===0 ?<div className='d-flex justify-content-center align-items-center mt-5' > <h1 className='btn btn-dark w-25 mt-4 mb-5 text-center'>Panier vide</h1></div> : ''
            }
            </div>
            {
                cart.map(item=>(
                    <div className='details cart shadow' key={item.id}>
                        <img src={url+item.image} alt='' />
                        <div className="box">
                            <div className="row">
                                <h2>{item.title}</h2>
                                <span className='font-weight-bolder ml-3 amount'>{item.price * item.quantite}€</span>
                            </div>
                            <p>{item.description}</p>
                            <div className='d-flex '>
                            
                            {
                                item.category_id===1 ?
                                <span className=''>
                            <label className='coltail'>Couleurs:</label>
                            <div className='d-flex ml-1 mt-2'>
                              <span className='color' style={{backgroundColor:item.colors[0]}} onClick={()=>handleColor(item.colors[0])}  ></span>
                             <span className='color' style={{backgroundColor:item.colors[1]}} onClick={()=>handleColor(item.colors[1])}></span>
                             <span className='color' style={{backgroundColor:item.colors[2]}} onClick={()=>handleColor(item.colors[2])}></span>
                           </div>
                           </span>:''
                            }
                            
                            {
                                item.category_id===1 ?
                                <span className='text-center taille  ml-3'>
                            <label htmlFor="taille" className='coltail'>Pointure</label>
                                <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center' onChange={handleTaille}>
                                <option className='text-center text-dark'>{item.taille[0]}</option>
                               <option className='text-center text-dark'>{item.taille[1]}</option>
                                <option className='text-center text-dark' >{item.taille[2]}</option>
                                </select>
                                </span>
                                :''
                            }
                            {
                                item.category_id ===2 ?
                                <span className='text-center taille  ml-3'>
                               <label htmlFor="taille" className='coltail'>Taille</label>
                                <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center mb-3' onChange={handleTaille}>
                                <option className='text-center text-dark'>{item.taille[0]}</option>
                               <option className='text-center text-dark'>{item.taille[1]}</option>
                                <option className='text-center text-dark' >{item.taille[2]}</option>
                                </select>
                                </span>
                                :''
                            }
                                
                                
                                 </div>
                            <div className="count mt-2">
                                <button onClick={()=>increase(item.id)} className='btn-sm rounded-lg btn-primary font-weight-bolder'>+</button>
                                          <span className='ml-1'>{item.quantite}</span>
                                <button onClick={()=>reduction(item.id)} className='rounded-lg btn-sm btn-danger font-weight-bolder ml-2'>-</button>
                                <button className='delete' onClick={()=>removeProduct(item.id)}>X</button>
                            </div>
                        </div>
                    </div>

                    
                ))
                
            }
             
             {
                   cart.length >0 ?
                   <div className='d-flex justify-content-between shadow text-danger mb-5'>
                  <Link to='/payement' className='btn btn-dark p-3 rounded-lg ml-2 w-25' >Paiement</Link>
                   <h3>Total: {total}€</h3>
                  </div>
                  : '' 
                }
            
            
             </div>

    )
}
export default Cart
