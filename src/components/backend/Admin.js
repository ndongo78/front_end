import React,{useContext,useState,useEffect}  from 'react'
import { dataContext1 } from '../Globals/Global';
import Slide from 'react-reveal/Slide';
import userPro from '../images/user.png'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import "../Css/Product.css"


const Admin=(props)=> {
         
         const {product}=useContext(dataContext1)
         const [error,seterror]=useState([])
         const [redirect,setredirect]=useState(false)
        const [url]=useState('https://shop.ndongodahs.fr/uploads/')
        const [user,setuser]=useState('')

    const logOut=()=>{
       sessionStorage.getItem('userData','');
       sessionStorage.clear();
       localStorage.getItem('react_token','');
       localStorage.removeItem('react_token');
       localStorage.clear();
        props.history.push('/')
    }

    useEffect(() => {
        if(!localStorage.getItem('react_token')){
            setredirect(true)
        }

        
        const id= sessionStorage.getItem('userData')
        const fd=new FormData()
        fd.append('id',id)
        axios.post("https://shop.ndongodahs.fr/api/adInfo",fd)
        .then(res=>{
           setuser(res.data)
        })
        .catch(error=>{
            seterror(error.response.data.errors)
        })
       
    }, [props.history])
   
    if(redirect){
      return  <Redirect to='/login'/>
    }

    const deleteArticle=(id)=>{
        window.confirm('Voulez-vous Suprimer cet article')
        const headers={
            // 'Content-Aype':'application/json',
            // 'Access-Control-Allow-Origin':'*'
            headers : {
              "react_token" : localStorage.getItem('react_token'),
            }
        }
             axios.delete(`https://shop.ndongodahs.fr/api/${id}/delete`,headers)
                 .then(res=>
                 {
                     
                 })
         }
           
        return (
            <Slide left >
            <div className='container-fluid bg-light'>
                <ScrollToTop smooth />
                 <h2 className='text-center text-danger'>{error}</h2>
                <div className='d-flex '>
                <h1 className='text-center btn-dark mt-3 ml-5 w-75 h-25 font-weight-lighter'>Bonjour {user.name}</h1>
                <div className="dropdown d-flex  ml-auto">
                    <img src={userPro} alt=''  className='w-50  ml-5 rounded-circle bg-secondary'/>
                <button className="btn btn-primary w-25 d-block m-auto mb-4 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </button>
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
                <div className='d-flex justify-content-around w-75 m-3 p-3 font-weight-bolder lesButton '>
                <Link to='/createCategory' className='btn btn-primary  rounded-lg buton'>Ajouter nouvelle Category</Link>
                    <Link to='/createArticle' className='btn btn-primary ml-2  rounded-lg buton'>Ajouter  Article</Link>
                    <Link to='/commande' className='btn btn-primary ml-2  rounded-lg buton'>Voir commandes</Link>
                    <Link to='/mesclients' className='btn btn-primary ml-2  rounded-lg buton'>Voir mes clients</Link>
                    <Link to='/messages' className='btn btn-primary ml-2  rounded-lg buton'>Voir messages clients</Link>
                    <Link to='/promo' className='btn btn-primary ml-2  rounded-lg buton'>Proposer une promotion</Link>
                </div>
            <table className="table table-bordered table-striped table-bordered table-hover mt-4 table-responsive-lg">
             <thead>
             <tr className='text-center bg-light text-primary text-uppercase font-italic'>
                 <th>Identifiant</th>
                 <th>Image</th>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Couleur disponible</th>
                <th>Taille disponible</th>
                <th>Actions</th>
               </tr>
            </thead>
           {
           product.map(item=>(
           <tbody key={item.id}>
               <tr>
                   <td>{item.id}</td>
                   <td><img src={url+item.image} alt='Product-img' className='w-50'/></td>
                   <td>{item.category_id===1 ? 'Chaussures':'' }
                   {item.category_id===2 ? 'Vétements':""}
                   {item.category_id===3 ? 'Accessoires':""}
                   </td>
                   <td>{item.title}</td>
                   <td className='w-25'>{item.description}</td>
                   <td>{item.price}</td>
                       {
                        item.category_id ===1 ? 
                        <td className='d-flex'>  
                        <span className='color' style={{backgroundColor:item.colors[0]}} ></span>
                        <span className='color' style={{backgroundColor:item.colors[1]}}></span>
                        <span className='color' style={{backgroundColor:item.colors[2]}}></span>
                        </td> :''
                       }
                       {
                        item.category_id ===1 ?
                           <td>
                        <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                       <option className='text-center text-dark'>{item.taille[0]}</option>
                        <option className='text-center text-dark'>{item.taille[1]}</option>
                       <option className='text-center text-dark'>{item.taille[2]}</option>
                        </select>
                        </td>:''
                       }
                       {
                           item.category_id ===2 ?
                        <td>
                        <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                       <option className='text-center text-dark'>{item.taille[0]}</option>
                        <option className='text-center text-dark'>{item.taille[1]}</option>
                       <option className='text-center text-dark'>{item.taille[2]}</option>
                        </select>
                        </td>:''
                       }
                       {
                           item.category_id ===3 ? 
                           <td>
                               <span></span>
                               <span></span>
                               <span></span>
                           </td>
                           :''
                       }
                   <td className='d-flex justify-content-between'>
                       <button className='btn btn-success mr-2'><Link className='text-white' to={`/ediitArticle/${item.id}`}><i className="fas fa-pencil-alt"></i></Link></button>
                       <button className='btn btn-danger' onClick={()=>deleteArticle(item.id)}><i className="far fa-trash-alt"></i></button>
                   </td> 
                  </tr>
                  </tbody>
           ))
          }
  </table>

            </div>
             </Slide>
        )
    }
export default Admin
