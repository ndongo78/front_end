import React, { Component } from 'react'
import '../components/Css/Product.css'
import logo from './images/logo.png';
import {Link} from 'react-router-dom'
import { dataContext1 } from './Globals/Global';

export default class Navbar extends Component {
  static contextType=dataContext1;
        state={
          redirect:false,
          redirect2:false,
          search:'',
          searchResul:[],
          url:'https://shop.ndongodahs.fr/uploads/',
          detail:true,
          error:''
        }

   handleSeach=(e)=>{
     this.setState({search:e.target.value})
    //  console.log(this.state.search);

    const {product}=this.context; 
    if(this.state.search){
       const result= product.filter(item=>(
         item.title.toLowerCase().includes(this.state.search)
     ))
     if(!result){
       this.setState({error: "Le produit recherché n'est pas disponible !!!"})
     }
   //console.log(result)
     this.setState({searchResul:result})
     this.setState({search: ''})
    }else{
      return null
    }

   }
        

        componentDidMount=()=>{
          
          const react_token=localStorage.getItem('react_token')
          if(react_token ==="X3OHNteUSYb2YIcywoJ6ZlMWJJD7by1EP"){
            this.setState({redirect:true})
          }else{
            this.setState({redirect2: true})
          }
          
            
        }

        // handleSubmit=(e)=>{
        //   e.preventDefault();
        //   const {product}=this.context; 
        //   if(this.state.search){
        //      const result= product.filter(item=>(
        //        item.title.toLowerCase().includes(this.state.search)
        //    ))
        //    if(!result){
        //      this.setState({error: "Le produit recherché n'est pas disponible !!!"})
        //    }
        //  //console.log(result)
        //    this.setState({searchResul:result})
        //    this.setState({search: ''})
        //   }else{
        //     return null
        //   } 
        // }

        handleRedirect=(id)=>{
          this.setState({detail:false})
          //window.location.reload(false);
        
        }

    render() {
      const {cart}=this.context;

        return (
          <>
            <nav className="navbar navbar-expand-lg shadow  fh5co-nav">
            <Link className="navbar-brand ml-3" to="/"><img src={logo} alt='' className='bg-dark rounded-circle'/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className=" hurger"><i className="fas fa-bars"></i></span>
            </button>
            
            <ul className="collapse navbar-collapse" id="menu">
              <li className="search ml-5">
							<div className="input-group">
						      <input type="text" placeholder="Search.." onChange={this.handleSeach}/>
						      <span className="input-group-btn">
						        <button className="btn btn-primary" type="button" onClick={this.handleSubmit}><i className="fas fa-search" style={{color: 'rgba(0, 0, 0, 0.5)'}}></i></button>
						      </span>
						    </div>
					     	</li>

                    <div className="liens">
                        <Link className="nav-item nav-link active a" to="/">Accueil </Link>
                        <Link className="nav-item nav-link a" to="/product">Produits</Link>
                        <Link className="nav-item nav-link a" to="/contact">Contact</Link>
                    </div>
                    {
                      localStorage.getItem('react_token') ?
                          <div>
                            {
                              this.state.redirect &&<Link to='/admin' className='btn btn-sm btn-light' ><i className="fas fa-user-circle user1" ></i></Link>
                            }
                            {
                              this.state.redirect2 && <Link to='/moncompte' className='btn btn-sm btn-light' ><i className="fas fa-user-circle user1"></i></Link>
                            }
                            
                          </div>
                       :
                       <div className='login'>
                  <li className="nav-item">
                 <Link className="nav-link " to="/login">Mon compte</Link>
                </li>
                </div>
                    }  
                <li className="shopping-cart">
                  <Link to="/cart" className="cart">
                    <span>
                  <small>{cart.length}</small>
                      <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-bag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                      </svg>
                    </span>
                  </Link>
                  </li>
                
              </ul>

          </nav>
          <div>
            <div id='product'>
             
            {/* "AIzaSyCqsMc2gTLE3ZviEap-wTUbppNZR7ekDKY" */}

               
                    {
                        this.state.detail ?
                            this.state.searchResul.map(item=>(
                  
                      <div className='card' key={item.id}>
                        <Link to={`/${item.id}/product`} >
                                   
                        <img src={this.state.url+item.image} alt='' onClick={this.handleRedirect}/>
                            
                        </Link>
                        <div className='content'>
                        <Link to={`/${item.id}/product`} className='text-center ml-2 btn' key={item.id} onClick={this.handleRedirect} >{item.title}</Link>
                          </div>

                     </div>
  
                )):this.state.error
                  }

            </div>
            </div>
          </>
        )
    }
}
