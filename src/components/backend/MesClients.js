import React,{useContext} from 'react'
import { dataContext1 } from '../Globals/Global'

function MesClients() {
    const {mesclients} = useContext(dataContext1)
    return (
        <div className='container' style={{height:'100vh'}}>
            <div className='d-flex justify-content-center align-items-center'>
            <h1 className='font-weight-bolder text-center btn-dark w-50 rounded-lg mt-4 mb-4'>Mes clients</h1>
            </div>
           <table className="table table-bordered table-striped table-bordered table-hover mt-4 table-responsive-lg">
             <thead>
             <tr className='text-center bg-light text-primary text-uppercase font-italic'>
                 <th>Nom</th>
                 <th>Prenom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Addresse</th>
                
               </tr>
            </thead>
            {
           mesclients.map(item=>(
           <tbody key={item.id}>
               <tr>
                <td>{item.name}</td>
                <td>{item.prenom}</td>
                <td>{item.email}</td>
                <td>{item.telephone}</td>
                <td>{item.addresse}</td>
                  
                   </tr>
                   </tbody>
           ))
           }
            </table>
            
        </div>
    )
}

export default MesClients
