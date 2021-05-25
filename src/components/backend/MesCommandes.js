import React,{useContext,useState} from 'react'
import { dataContext1 } from '../Globals/Global'

const MesCommandes=()=> {
    const {commandes} = useContext(dataContext1)
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')

    return (
        <div className='container-fluid' style={{height:'100vh'}}>
            <div className='d-flex justify-content-center align-items-center'>
            <h1 className='font-weight-bolder text-center btn-dark w-50 rounded-lg mt-4 mb-4'>Toutes les Commandes</h1>
            </div>
            <table className="table table-bordered table-striped table-bordered table-hover mt-4 table-responsive-lg">
             <thead>
             <tr className='text-center bg-light text-primary text-uppercase font-italic'>
                 <th>INFORMMATIONS DU CLIENT</th>
                 <th>INFORMATIONS DE L'ARTICLE </th>
                 <th>STATUS </th>
                
               </tr>
            </thead>
            <tbody>
      
          {
           commandes.map(item=>(
               <tr key={item.id}>
                <td className='w-25'>
                  Pronom: {item.prenom} <br/>
                  Nom: {item.name}<br/>
                  Email: {item.email}<br/>
                  Telephone: {item.telephone}<br/>
                  Addresse de Livraison: {item.addresse}<br/>
                </td>
                  <td className='w-50'>
                      <p className=''>
                         
                          <img src={url+item.image} alt='' />
                          <span className='ml-2 text-danger font-weight-bold'>{item.title}</span>
                          <span className='float-right font-weight-bolder text-danger'>{item.price}€</span>
                      </p>
                        <p>
                            {item.description}
                        </p>
                  </td>
                  <td>
                      <p className='font-weight-bolder text-success bg-white text-center'>Livré</p>
                  </td>
               </tr>
           ))
          }
        
      
    </tbody>
  </table>
        </div>
    )
}

export default MesCommandes
