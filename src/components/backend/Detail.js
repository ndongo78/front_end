import React from 'react'
import { dataContext1 } from '../Globals/Global'
import axios from 'axios'


class Detail extends React.Component {
    static contextType=dataContext1
   state={
       mydonne:[],
       url: 'https://shop.ndongodahs.fr/uploads/'
   }
   

    componentDidMount() {
        const fd= new FormData();
        const id=this.props.match.params.id
        fd.append('id',id)
        axios.post('https://shop.ndongodahs.fr/api/getByid',fd)
        .then(res=>{
            this.setState({mydonne:res.data.success})
        })
        .catch(error=>console.log(error))
    }

    render() {
        const {addCart}=this.context
        

        return (
            <div className='container mt-3 cart bg-light'>
                <h1 className='text-center btn-dark font-italic font-weight-bolder'>Detail du Produit</h1>
                <div className='details cart shadow'>
                        <img src={this.state.url+this.state.mydonne.image} alt='' />
                        <div className="box">
                            <div className="row">
                                <h2>{this.state.mydonne.title}</h2>
                                <span className='font-weight-bolder ml-3 amount'>{this.state.mydonne.price}€</span>
                            </div>
                            <p>{this.state.mydonne.description}</p>
                                    {
                                        this.state.mydonne.category_id ===1 ?
                                    <div className='d-flex'>
                                        <span>
                                      <label className='coltail'>Couleurs:</label>
                                    <div className='d-flex ml-1 mt-2'>
                                      <span className='color' style={{backgroundColor:this.state.mydonne.colors[0]}} ></span>
                                      <span className='color' style={{backgroundColor:this.state.mydonne.colors[1]}} ></span>
                                      <span className='color' style={{backgroundColor:this.state.mydonne.colors[2]}} ></span>
                                    </div>
                                    </span>
                                    <div className='text-center taille '>
                                    <label htmlFor="taille" className='coltail'>Pointure</label>
                                    <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                                     <option className='text-center text-dark'>{this.state.mydonne.taille[0]}</option>
                                   <option className='text-center text-dark'>{this.state.mydonne.taille[1]}</option>
                                <option className='text-center text-dark'>{this.state.mydonne.taille[2]}</option>
                                </select>
                                </div>
                                </div>
                                        :""
                                    }
                                    {
                                        this.state.mydonne.category_id ===2 ?
                                        <div className='text-center'>
                                        <label htmlFor="taille" className='coltail'>Taille</label>
                                        <select name="taille" id="taille" className='custom-select w-25 mt-2 text-center'>
                                         <option className='text-center text-dark'>{this.state.mydonne.taille[0]}</option>
                                       <option className='text-center text-dark'>{this.state.mydonne.taille[1]}</option>
                                    <option className='text-center text-dark'>{this.state.mydonne.taille[2]}</option>
                                    </select>
                                     </div>

                                        :''
                                    }
                                  <button className='btn btn-primary font-italic rounded-medium p-2 mt-4 buton' onClick={()=>addCart(this.state.mydonne.id)} >Ajouter au panier</button>
                                
                        </div>
                    </div>
            </div>
        )
    }
}

export default Detail
