import React, { Component } from 'react'
import '../Css/contact.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

export default class Login extends Component {

    state={
        email:'',
        password:'',
        redirect:false,
        erreurs:[],
        posEur:''
    }


    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        const user= new FormData();
        user.append('email',this.state.email);
        user.append('password',this.state.password);
        axios.post('https://shop.ndongodahs.fr/api/login',user)
        .then(res=>{
              console.log(res.data);
            let responseJson=res.data;
            if(responseJson.role==="admin"){
                localStorage.setItem('react_token',res.data.react_token)
                sessionStorage.setItem('userData',responseJson.id)
                this.props.history.push('/admin')
            }else{
                localStorage.setItem('react_token',res.data.react_token)
                sessionStorage.setItem('userInfo',JSON.stringify(responseJson.id) )
                this.props.history.push('/moncompte')
            }
        })
        .catch(error=>{
           
           this.setState({posEur: error.response.data.errorsIdentifiant})
         this.setState({erreurs:error.response.data.errors})
        
        })
    }


    render() {
        

        return (
            <>
                <h1 className='text-center text-primary mt-5 mb-5 '>Connectez Vous</h1>
                
                <div className='container mb-5'>
                        <div className='row'>
                            <div className='col-md-6 mt-3 bg-primary formLog d-flex justify-content-center justify-content-center align-items-center flex-column rounded-lg'>
                                <h2 className='text-white'>Pas encore client</h2>
                                <p className='text-white mb-3'>Inscrivez-vous pour profiter de tous les avantages  client</p>
                                <Link to='/register' className='btn btn-white p-2 mb-5 mt-3 mr-2 float-right create'>Creer un compte</Link>
                            </div>
                            <div className='col-md-6'>
                    <form method='Post' className='  formLog mb-4 font-weight-bolder w-100' onSubmit={this.handleSubmit}>
                        
                     <div className=' alert text-danger text-center font-weight-bolder font-italic'>{this.state.posEur}</div>
                     <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                     <label htmlFor='email' >Email</label>
                    <InputGroup className='formInput '>
                    <InputGroup.Prepend>
                   <InputGroup.Text id="basic-addon1"><i className="fas fa-at icones"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                    placeholder="example@yahoo.fr"
                    aria-label="Email"
                    name='email'
                    onChange={this.handleChange}
                    type='email'
                    />
                    </InputGroup>
                        {
                             this.state.erreurs && this.state.erreurs.email ? <span className='text-danger' >{this.state.erreurs.email}</span>:''
                         }
                    </div>
                    <div className='form-group d-flex justify-content-center align-items-center flex-column'>
                     <label htmlFor='email' >Mot de pass</label>
                    <InputGroup className='formInput'>
                    <InputGroup.Prepend>
                   <InputGroup.Text id="basic-addon1"><i className="fas fa-lock icones"></i></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                    placeholder="...."
                    aria-label="password"
                    name='password'
                    onChange={this.handleChange}
                     type='password'
                    />
                    </InputGroup>
                        {
                             this.state.erreurs && this.state.erreurs.password ? <span className='text-danger ' >{this.state.erreurs.password}</span>:''
                         }
                    </div>
                       <div className='form-group'>
                        <Button type='submit' name='send' className='btn  btn-block w-75 d-block m-auto buton'>Se connecter</Button>
                        <Link to='/reset' className='btn forget p-2 mb-5 mt-3 ml-3  float-right'>Mot de Oublié?</Link>
                      </div>
                    </form>
                    </div>
                    </div>
                </div>
            </>
        )
    }
}
