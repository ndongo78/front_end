import React,{useEffect,useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'


const Client=(props)=> {

    const [redirect,setredirect]=useState(false)
    const [error,seterror]=useState([])
    const [user,setuser]=useState('')

   const logOut=()=>{
        localStorage.getItem('react_token','');
        sessionStorage.getItem('userInfos','');
         localStorage.clear();
         sessionStorage.clear();
         props.history.push('/')
     }

     useEffect(() => {
        if(!localStorage.getItem('react_token')){
            setredirect(true)
        }

        const id= sessionStorage.getItem('userInfo')
        const fd=new FormData()
        fd.append('id',id)
        axios.post("https://shop.ndongodahs.fr/api/getInfo",fd)
        .then(res=>{
           setuser(res.data)
        })
        .catch(error=>{
            seterror(error.response.data.errors)
        })
       
    }, [])


    if(redirect){
        return  <Redirect to='/login'/>
      }

    return (
        <div className='container mb-5' style={{height:'100vh'}}>
            <div className='d-flex justify-content-between'>
                <p className='text-center text-danger'>{error}</p>
              <h1 className='text-center mt-3 ml-5 w-75 h-25 font-weight-lighter'> </h1>
              <div className="dropdown  float-right tog mt-4">
                <button className="btn btn-primary w-50 d-block m-auto mb-4 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mon compte <br/> <span>Bonjour {user.name}</span></button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <ul className='list-group font-weight-bolder list-group-item-dark text-uppercase'>
                        <li className='list-group-item'>Nom: {user.name}</li>
                        <li className='list-group-item'>Prenom: {user.prenom}</li>
                        <li className='list-group-item'>Email: {user.email}</li>
                        <li className='list-group-item'>Telephone: {user.telephone}</li>
                        <li className='list-group-item'>Addresse: {user.addresse}</li>
                    </ul>
                    <form>
                        <button className='btn btn-danger float-right' type='submit' onClick={logOut}>Deconnecter</button>
                    </form>
                
               </div>
              </div>
              </div>
            
             <div className='row d-flex justify-content-center align-items-center mt-3 mb-4' >
                <div className=' col-md-4 infos'>
                    <p className='mt-3'>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-lines-fill d-block m-auto icoPos" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                </svg>
                </p>
                 
                 <p className='d-flex justify-content-center align-items-center '><Link to='/modifierInfos' className='btn btn-primary buton'>Modifier information</Link></p> 
                 </div>
                 <div className='col-md-4 infos'>
                 <p className='mt-3'><i className="fas fa-box d-block m-auto icoPos"></i></p>
                 <p className='d-flex justify-content-center align-items-center '><Link to='/mesCommandes' className='btn btn-primary buton'>Mes Commandes</Link></p>
                 </div>
                 <div className=' col-md-4 infos'>
                 <p className='mt-3'><i className="far fa-money-bill-alt d-block m-auto icoPos"></i></p>
                 <p className='d-flex justify-content-center align-items-center '><Link to='/mesRemboursement' className='btn btn-primary buton'>Payement et Remboursement</Link></p>
                 </div>
             
              <div className='col-md-4 infos'>
                 <p className='mt-3'>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-suit-heart-fill d-block m-auto icoPos" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                  </svg>
                </p>
                 <p className='d-flex justify-content-center align-items-center '><Link to='/mesFavorite' className='btn btn-primary buton'>Mes Favorites et Souhait</Link></p>
                 </div>
                 <div className='col-md-4 infos '>
                 <p className='mt-3'>
                 <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-question d-block m-auto icoPos" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                 </svg>
                </p>
                 <p className='d-flex justify-content-center align-items-center '><Link to='/contact' className='btn btn-primary buton'>Aides</Link></p>
                 </div>
             </div>
        </div>
    )
}

export default Client
