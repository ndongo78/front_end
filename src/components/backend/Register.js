import React, { Component } from 'react'
import '../Css/contact.css'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { Redirect}  from 'react-router-dom'


export default class Register extends Component {
      constructor(props){
          super(props)
       this.state={
                name:'',
                prenom:'',
                email:'',   
                password:'',
                confirm_password:'',
                telephone:'',
                addresse:'',
                redirect:false,
                erreurs:[],
            }
            
        }
            


    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }

         
    handleSubmit=(e)=>{
        e.preventDefault();
        const fd=new FormData();
        // const datas={
        //     name: this.state.name,
        //     email:this.state.email,
        //     password:this.state.password,
        //     confirm_password:this.state.confirm_password
        // }
       
       fd.append('name',this.state.name)
       fd.append('prenom',this.state.prenom)
       fd.append('email',this.state.email)
       fd.append('password',this.state.password)
       fd.append('confirm_password',this.state.confirm_password)
       fd.append('telephone',this.state.telephone)
       fd.append('addresse',this.state.addresse)


       axios.post('https://shop.ndongodahs.fr/api/register.store',fd)
       .then(res=>{
          localStorage.setItem("react_token",res.data.react_token)
          sessionStorage.setItem('userInfo',JSON.stringify(res.data.id) )
              this.setState({redirect:true})
           
          
       })
       .catch(error=>{
         
         this.setState({erreurs:error.response.data.errors})
           
       })
       
    }

    render() {
        if(this.state.redirect){
          return  <Redirect to='/moncompte'/>
        }
        
        
        return (
            <>
                <h1 className='text-center text-danger'>Creer un compte</h1>
                <div className='container font-weight-bolder d-flex justify-content-center align-items-center'>
                    <form method='Post' className='w-75' onSubmit={this.handleSubmit}>
                  
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Nom</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="far fa-user icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="Doh"
                        aria-label="Nom"
                        onChange={this.handleChange}
                        name='name'
                        />
                    </InputGroup>
                       {
                             this.state.erreurs && this.state.erreurs.name ? <span className='text-danger' >{this.state.erreurs.name}</span>:''
                         }
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Prémom</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="far fa-user icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="John"
                        aria-label="prenom"
                        onChange={this.handleChange}
                        name='prenom'
                        />
                    </InputGroup>
                        {
                             this.state.erreurs && this.state.erreurs.prenom ? <span className='text-danger' >{this.state.erreurs.prenom}</span>:''
                         }
                    </div>
                      <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Email</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-at icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="example@yahoo.fr"
                        aria-label="Email"
                        onChange={this.handleChange}
                        name='email'
                        />
                    </InputGroup>
                         {
                             this.state.erreurs && this.state.erreurs.email ? <span className='text-danger' >{this.state.erreurs.email}</span>:''
                         }
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Mot de pass</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-lock icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="..."
                        aria-label="password"
                        onChange={this.handleChange}
                        name='password'
                        type='password'
                        />
                    </InputGroup>
                      {
                             this.state.erreurs && this.state.erreurs.password ? <span className='text-danger' >{this.state.erreurs.password}</span>:''
                         }
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Confirmer mot de pass</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-lock icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="..."
                        aria-label="password"
                        onChange={this.handleChange}
                        name='confirm_password'
                        type='password'
                        />
                    </InputGroup>
                        {
                             this.state.erreurs && this.state.erreurs.confirm_password ? <span className='text-danger' >{this.state.erreurs.confirm_password}</span>:''
                         }
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Téléphone</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-mobile-alt icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="0612382320"
                        aria-label="telephone"
                        onChange={this.handleChange}
                        name='telephone'
                        type='tel'
                        />
                    </InputGroup>
                        {
                             this.state.erreurs && this.state.erreurs.telephone ? <span className='text-danger' >{this.state.erreurs.telephone}</span>:''
                         }
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                        <label htmlFor='email' >Addresse</label>
                        <InputGroup className='formInput w-75'>
                        <InputGroup.Prepend>
                       <InputGroup.Text id="basic-addon1"><i className="fas fa-home icones"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                        placeholder="02 avenue paris 75000 paris"
                        aria-label="addresse"
                        onChange={this.handleChange}
                        name='addresse'
                        />
                    </InputGroup>
                       {
                             this.state.erreurs && this.state.erreurs.addresse ? <span className='text-danger' >{this.state.erreurs.addresse}</span>:''
                         }
                    </div>
                       <div className='form-group text-center'>
                        <Button type='submit' name='send' className='btn btn-primary p-2 w-25 buton'>S'inscrire</Button>
                        <Button type='reset' name='send' className='btn btn-danger buton ml-3 p-2 w-25'>Annuler</Button>
                       </div>
                    </form>
                </div>
            </>
        )
    }
}
