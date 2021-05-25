import React,{Component} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class UpdateInfos extends Component {
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
              setRedirect:false,
              user:[],
              seterror:'',
              id:''
          }
          
      }
          

      componentDidMount(){
        if(!localStorage.getItem('react_token')){
            this.setState({setRedirect: true})
        }

        const id= sessionStorage.getItem('userInfo')
        const fd=new FormData()
        fd.append('id',id)
        axios.post("https://shop.ndongodahs.fr/api/getInfo",fd)
        .then(res=>{
          //console.log(res.data)
          this.setState({id: res.data.id})
          this.setState({name: res.data.name})
          this.setState({prenom: res.data.prenom})
          this.setState({email: res.data.email})
          this.setState({password: res.data.password})
          this.setState({confirm_password: res.data.confirm_password})
          this.setState({telephone: res.data.telephone})
          this.setState({addresse: res.data.addresse})
        //   this.setState({user:res.data}) 
        })
        .catch(error=>{
           this.setState({seterror:error.response.data.errors}) 
        })
      }


  handleChange=(e)=>{
      this.setState({
          [e.target.name]: e.target.value
      })
      
  }

       
  handleSubmit=(e)=>{
      e.preventDefault();
      const fd=new FormData();
     fd.append('id',this.state.id)
     fd.append('name',this.state.name)
     fd.append('prenom',this.state.prenom)
     fd.append('email',this.state.email)
     fd.append('password',this.state.password)
     fd.append('confirm_password',this.state.confirm_password)
     fd.append('telephone',this.state.telephone)
     fd.append('addresse',this.state.addresse)


     axios.post('https://shop.ndongodahs.fr/api/updateUserInfos',fd)
     .then(res=>{
        localStorage.setItem("react_token",res.data.react_token)
        
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
              <h1 className='text-center text-danger'>Modifier mes informations</h1>
              <div className='container font-weight-bolder d-flex justify-content-center align-items-center bg-white'>
                  <form method='Post' className='w-75' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                      <label htmlFor='name'>Nom:</label>
                      <input type='text' name='name' id='name' value={this.state.name} className='form-control' onChange={this.handleChange}/>
                       {
                           this.state.erreurs && this.state.erreurs.name ? <span className='text-danger' >{this.state.erreurs.name}</span>:''
                       }
                    </div>
                    <div className='form-group'>
                      <label htmlFor='prenom'>Prenom:</label>
                      <input type='text' name='prenom' value={this.state.prenom} id='prenom' className='form-control' onChange={this.handleChange}/>
                       {
                           this.state.erreurs && this.state.erreurs.prenom ? <span className='text-danger' >{this.state.erreurs.prenom}</span>:''
                       } 
                    </div>
                     <div className='form-group'>
                     <label htmlFor='email'>Email:</label>
                      <input type='email' name='email' value={this.state.email} id='email' className='form-control' onChange={this.handleChange}/>
                      {
                           this.state.erreurs && this.state.erreurs.email ? <span className='text-danger' >{this.state.erreurs.email}</span>:''
                       }
                     </div>
                     <div className='form-group'>
                     <label htmlFor='password'>Mot de Pass:</label>
                      <input type='password' name='password' value={this.state.password} id='password' className='form-control' onChange={this.handleChange}/>
                      {
                           this.state.erreurs && this.state.erreurs.password ? <span className='text-danger' >{this.state.erreurs.password}</span>:''
                       }
                     </div>
                     <div className='form-group'>
                     <label htmlFor='cpassword'>Mot de Pass:</label>
                      <input type='password' value={this.state.confirm_password} name='confirm_password' id='cpassword' className='form-control' onChange={this.handleChange}/>
                      {
                           this.state.erreurs && this.state.erreurs.confirm_password ? <span className='text-danger' >{this.state.erreurs.confirm_password}</span>:''
                       }
                     </div>
                     <div className='form-group'>
                      <label htmlFor='telephone'>Telephone:</label>
                      <input type='tel' name='telephone' id='telephone' value={this.state.telephone} className='form-control' onChange={this.handleChange}/>
                       {
                           this.state.erreurs && this.state.erreurs.telephone ? <span className='text-danger' >{this.state.erreurs.telephone}</span>:''
                       }
                    </div>
                    <div className='form-group'>
                      <label htmlFor='addresse'>Addresse:</label>
                      <input type='text' name='addresse' value={this.state.addresse} id='addresse' className='form-control' onChange={this.handleChange}/>
                       {
                           this.state.erreurs && this.state.erreurs.addresse ? <span className='text-danger' >{this.state.erreurs.addresse}</span>:''
                       }
                    </div>
                     <div className='form-group text-center'>
                      <input type='submit' name='send' className='btn btn-success p-2'/>
                      <input type='reset' name='send' className='btn btn-danger ml-3 p-2'/>
                     </div>
                  </form>
              </div>
          </>
      )
  }
}
