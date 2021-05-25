import React,{useContext} from 'react'
import { dataContext1 } from '../Globals/Global'

const Messages=()=> {

    const {messages} = useContext(dataContext1)

    return (
        <div className='container-fluid' style={{height:'100vh'}}>
             <div className='d-flex justify-content-center align-items-center'>
            <h1 className='font-weight-bolder text-center btn-dark w-50 rounded-lg mt-4 mb-4'>Toutes les Messages</h1>
               
            </div>
            <table className="table table-bordered table-striped table-bordered table-hover mt-4 table-responsive-lg">
            <thead>
             <tr className='text-center bg-light text-primary text-uppercase font-italic'>
                 
                 <th>Client</th>
                 <th>Email</th>
                 <th>Object</th>
                  <th>Messages</th>
               </tr>
            </thead>
            <tbody>
                {messages.map(item=>(
                    <tr className='text-center'>
                        
                        <td>{item.user_id}</td>
                        <td>{item.email}</td>
                        <td>{item.sujet}</td>
                        <td>{item.message}</td>
                    </tr>
                ))}

            </tbody>
            </table>
        </div>
    )
}

export default Messages
