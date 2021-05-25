import React from 'react';
import axios from "axios";

export const dataContext1= React.createContext()

class GlobalProvider extends React.Component {
    state={
        donnes:[],
        mescategory:[],
        chaussure:[],
        vetement:[],
        accessoire:[],
        cart:[],
        total:0,
        favoris:[],
        color:'',
        taille:'',
        checked:false,
        tailles:[],
        commandes:[],
        messages:[],
        newShoes:[],
        newVest:[],
        newAc:[],
        mesclients:[],
        promo:[]


    }

  //ajouter au panier
  addCart=(id)=>{
        const {donnes,cart}=this.state;
        const check= cart.every(item=>(
            item.id !==id
        ))
      if (check){
          const data=donnes.filter(item=>(
              item.id===id
          ))
         this.setState({cart: [...cart,...data]})
         alert("Article ajouter au panier")
      }else {
          alert("Article ajouter au panier")
      }
  }



//Suprimer item dans le panier
  reduction=id=>{
        const {cart}=this.state;
        cart.forEach(item=>{
            if (item.id===id){
                item.quantite===1 ? item.quantite=1:item.quantite-=1
            }
            this.setState({cart: cart})
            this.getTotal()
        })
  }
  //add item dans panier
  increase=id=>{
      const {cart}=this.state;
      cart.forEach(item=>{
          if (item.id===id){
              item.quantite ++
          }
          this.setState({cart: cart})
          this.getTotal()
      })
  }
      
    componentDidMount(){
        const headers={
            // 'Content-Aype':'application/json',
            // 'Access-Control-Allow-Origin':'*'
            headers : {
              "react_token" : localStorage.getItem('react_token'),
            }
        }
        axios.get('https://shop.ndongodahs.fr/api/getArticle')
            .then(res => {
            
                this.setState({donnes:res.data})
                
                
            })
            .catch(error=>error.response)

        axios.get('https://shop.ndongodahs.fr/api/getCategory')
            .then(res => {
               
                  this.setState({
                      mescategory:res.data
                  })  
            })
            .catch(error=>error)

             
        axios.get('https://shop.ndongodahs.fr/api/getChaussures')
            .then(res => {
        
                this.setState({
                    chaussure:res.data
                })
            })
            .catch(error=>console.log(error))
        axios.get('https://shop.ndongodahs.fr/api/getVetements')
            .then(res => {
                
                this.setState({
                    vetement:res.data
                })
            })
            .catch(error=>console.log(error))

        axios.get('https://shop.ndongodahs.fr/api/getAccessoires')
            .then(res => {
                this.setState({
                    accessoire:res.data
                })
            })
            .catch(error=>error)

            axios.get('https://shop.ndongodahs.fr/api/getAllCommandes')
            .then(res => {
                 this.setState({commandes:res.data})
            })
            .catch(error=>error)

            axios.get('https://shop.ndongodahs.fr/api/getAllMessages')
            .then(res => {
                
                 this.setState({messages:res.data})
            })
            .catch(error=>error)

         //get new shoes
         axios.get('https://shop.ndongodahs.fr/api/getLast')
            .then((res)=>{
                     this.setState({newShoes: res.data})
            })
            .catch((error)=>
                error.response
            )
            //get new vestement
            axios.get('https://shop.ndongodahs.fr/api/getLastVet',headers)
            .then((res)=>{
                     this.setState({newVest: res.data})
            })
            .catch((error)=>{
                 console.log(error.response)
            })
             //get new accessoires
             axios.get('https://shop.ndongodahs.fr/api/getLastAcs',headers)
             .then((res)=>{
                      this.setState({newAc: res.data})
             })
             .catch((error)=>{
                 return error.response
             })
              //get clients
              axios.get('https://shop.ndongodahs.fr/api/mesclients',headers)
              .then((res)=>{
                    this.setState({mesclients:res.data})
              })
              .catch((error)=>{
                  return error.response
              })
              //get promotion
              axios.get('https://shop.ndongodahs.fr/api/getPromo',headers)
              .then((res)=>{
                    this.setState({promo:res.data})
              })
              .catch((error)=>{
                  return error.response
              })

 
    }
    //Delete item  dans le panier
   removeProduct=id=>{
        if(window.confirm('Voulez vous Suprimer l\'artcile')){

            const {cart}=this.state;
            cart.forEach((item,index)=>{
                if (item.id===id){
                    cart.splice(index,1)
                }
                this.setState({cart: cart})
               this.getTotal()
            })
          }
        }
//Total du price du panier
getTotal=()=>{
        const {cart}=this.state;
        const res=cart.reduce((prev,item)=>{
            return prev + (item.price * item.quantite)
        },0)
    this.setState({total:res})
}
//color selectionner
 handleColor=(colors)=>{
     this.setState({color: colors})
 }
 handleTaille=(e)=>{
     this.setState({taille:e.target.value})
 }

    render() {
       

        return (
            <dataContext1.Provider value={{product:[...this.state.donnes],category:[...this.state.mescategory],
                chaussure:[...this.state.chaussure],vetement:[...this.state.vetement],accessoire:[...this.state.accessoire],
                addCart:this.addCart,cart:this.state.cart,reduction:this.reduction,increase:this.increase,removeProduct:this.removeProduct,
                total:this.state.total,getTotal:this.getTotal, addAfavoris:this.addAfavoris,favoris:this.state.favoris,handleColor:this.handleColor,
                handleTaille:this.handleTaille,color:this.state.color,taille:this.state.taille,checked:this.state.checked,commandes:[...this.state.commandes],
                messages:[...this.state.messages],shoes:[...this.state.newShoes],vest:[...this.state.newVest],newAc:[...this.state.newAc],mesclients:[...this.state.mesclients],
                promo:[...this.state.promo]
            }}>
                {
                    this.props.children
                }
            </dataContext1.Provider>
        );

    }
}

export default GlobalProvider;