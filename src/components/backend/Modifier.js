import React, {useContext,useState,useEffect} from 'react';
import axios from "axios";
import { dataContext1 } from '../Globals/Global';





const Modifier =(props)=>{

    

const {category}=useContext(dataContext1)
    const [title,settitle]=useState('')
    const [description,setdescription]=useState('')
    const [category_id,setcategory_id]=useState('')
    const [price,setprice]=useState('')
    const [image,setimage]=useState(undefined) 
    const [color,setcolor]=useState([])
    const [erreur,seterreur]=useState('')
    const [taille,settaille]=useState([])
    const [message,setmessage]=useState()
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')


  useEffect(() => {
      const id=props.match.params.id
      const poste=new FormData()
      poste.append('id',id)
     axios.post('https://shop.ndongodahs.fr/api/editArticle',poste)
     .then(res=>{
        //console.log(res.data.colors)
         setcategory_id(res.data.category_id)
         settitle(res.data.title);
         setdescription(res.data.description)
         setprice(res.data.price)
         setimage(res.data.image)
         setcolor(res.data.colors)
         settaille(res.data.taille)
     })
     .catch(error=>console.log(error.response.data))
  }, [props.match.params.id])


//Creer add colors
const handleChange=(e,index)=>{
    color[index]= e.target.value;
    setcolor([...color])
}
//creer add taille
const handleChangeTaille=(e,i)=>{
    taille[i]=e.target.value;
    settaille([...taille])
}

   const handleChangeFile=(e)=>{
        setimage(
             e.target.files[0]
        )
    }
    

  

    const handleSubmit=(e)=> {
        e.preventDefault();
        
        const fd = new FormData();
        fd.append('id',props.match.params.id)
        fd.append('category_id',category_id);
        fd.append('title', title);
        fd.append('description',description);
        fd.append('price', price);
        fd.append('image', image);
        if(category_id ===1){
            for (let i = 0; i < color.length; i++) {
            fd.append('tab[]', color[i]); 
            }
        }
        if(category_id===2){
            for (let i = 0; i < taille.length; i++) {
        fd.append('tab2[]', taille[i]);
         }
        }
        
         const headers={
           'Content-Type':'multipart/form-data',

         }   

        axios.post(`https://shop.ndongodahs.fr/api/updateArticle`,fd,headers)
            .then((res)=>{
                     setmessage(res.data.success)
            })
            .catch((error)=>{
                seterreur(error.response.data.errors)
                 
            })

           setcategory_id('');
           settitle('');
           setdescription('');
           setprice('');
           setimage('');
           setcolor([]);
           settaille([]);
            
    }



        return (
            <div className='container text-center mt-5 border mb-4 bg-info font-weight-bolder '>
                <p className='alert text-center p-2 font-weight-bolder alert-success font-italic'>{message}</p>
                <form onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
                    <div className="form-group">
                        <label htmlFor="">Categories de l'article</label>
                        <select name="category_id" id="" value={category_id} onChange={(e)=>setcategory_id(e.target.value)} className='form-control'>
                            {
                              category.map(item=><option key={item.id}>{item.id}</option>)
                            }
                            {
                             erreur && erreur.category_id ? <span className='text-danger' >{erreur.category_id}</span>:''
                            }
                        </select>
                        <label htmlFor="">Title:</label>
                        <input type="text" name='title' value={title} onChange={(e)=>settitle(e.target.value)} className='form-control'/>
                           {
                             erreur && erreur.title ? <span className='text-danger' >{erreur.title}</span>:''
                            }
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description:</label>
                        <textarea name='description' value={description} onChange={(e)=>setdescription(e.target.value)} className='form-control'/>
                           {
                             erreur && erreur.description ? <span className='text-danger' >{erreur.description}</span>:''
                            } 
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Price:</label>
                        <input type="text" name='price' value={price} onChange={(e)=>setprice(e.target.value)} className='form-control'/>
                          {
                             erreur && erreur.price ? <span className='text-danger' >{erreur.price}</span>:''
                            }
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Image:</label>
                        <input type="file" name='image'  onChange={handleChangeFile}  className='form-control-file'/>
                            
                             <span><img src={url+image} className='w-25' alt=''/></span>
                   
                    </div>
                    <div className="form-group">
                         {
                             category_id ===1 ?
                                <div>
                                    <label className='text-danger font-weight-bolder pb-3 w-25 bg-white'>Changer Couleurs</label>
                                    {
                            color.map((color,index)=>{
                                return(
                                    <div className='form-group' key={index}>
                                   <input     
                                    value={color}
                                   type='text'
                                   
                                   onChange={(e)=>handleChange(e,index)}
                                   />
                                   </div>
                                )
                            })
                        }
                        <label htmlFor="colors" className='text-danger font-weight-bolder pb-3 w-25 bg-white'>Colors existant:</label>
                        {
                            color.map(item=>(
                                <input type='text' value={item}  className='form-control w-25 d-block m-auto' onChange={(e)=>handleChange(e)}  />
                            ))
                        }           

                         <label className='text-danger font-weight-bolder pb-3 w-25 bg-white'>Changer de taille:</label>
                        {
                            taille.map((taille,i)=>{
                                return(
                                    <div className='form-group' key={i}>
                                   <input     
                                   value={taille}
                                   type='text'
                                   
                                   onChange={(e)=>handleChangeTaille(e,i)}
                                   />
                                   </div>
                                )
                            })
                        }
                        <label htmlFor="" className='text-danger font-weight-bolder pb-3 w-25 bg-white'>Taille existant:</label>
                        {
                            taille.map(item=>(
                                <input type='text' value={item}  className='form-control w-25 d-block m-auto' onChange={(e)=>handleChangeTaille(e)}  />
                            ))
                        }
                                </div>
                             :''
                         }
                       
                    </div>
                    <div className="form-group">
                        {
                             category_id ===2 ?
                             <div>
                                  <label className='text-danger font-weight-bolder pb-3 w-25 bg-white'>Changer de taille:</label>
                        {
                            taille.map((taille,i)=>{
                                return(
                                    <div className='form-group' key={i}>
                                   <input     
                                   value={taille}
                                   type='text'
                                   
                                   onChange={(e)=>handleChangeTaille(e,i)}
                                   />
                                   </div>
                                )
                            })
                        }
                        <label htmlFor="" className='text-danger font-weight-bolder pb-3 w-25 bg-white'>Taille existant:</label>
                        {
                            taille.map(item=>(
                                <input type='text' value={item}  className='form-control w-25 d-block m-auto' onChange={(e)=>handleChangeTaille(e)}  />
                            ))
                        } 
                             </div>:""
                             
                         }
                    </div>
                    <div className="form-group">
                        <input type="submit" value='Envoyer' className='btn btn-success'/>

                    </div>
                </form>

            </div>
        );

}

export default Modifier;


