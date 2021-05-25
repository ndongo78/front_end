import React, {useContext,useState} from 'react';
import axios from "axios";
import { dataContext1 } from '../Globals/Global';





const PostArticle =()=>{
    
const {category}=useContext(dataContext1)
    const [title,settitle]=useState('')
    const [description,setdescription]=useState('')
    const [category_id,setcategory_id]=useState('')
    const [price,setprice]=useState('')
    const [image,setimage]=useState('')
    const [color,setcolor]=useState([])
    const [taille,settaille]=useState([])
    const [message,setmessage]=useState('')
    const [success,setsuccess]=useState('')


    

   const handleChangeFile=(e)=>{
        setimage(
             e.target.files[0]
        )
    }

    const handleSubmit=(e)=> {
        e.preventDefault();
        const fd = new FormData();

         fd.append('category_id',category_id);
         fd.append('title', title);
         fd.append('description',description);
         fd.append('price', price);
        fd.append('image', image);
        for (let i = 0; i < color.length; i++) {
                fd.append('tab[]', color[i]); 
                }
         for (let i = 0; i < taille.length; i++) {
            fd.append('tab2[]', taille[i]);
             }
       
             const headers={
                // 'Content-Aype':'application/json',
                // 'Access-Control-Allow-Origin':'*'
                headers : {
                  "react_token" : localStorage.getItem('react_token'),
                }
            }

        axios.post('https://shop.ndongodahs.fr/api/postArticle',fd,headers)
            .then((res)=>{
                     setsuccess(res.data.message)
            })
            .catch((error)=>{
                setmessage(error.response.data.errors)
            })
            settitle('')
            setdescription('')
            setimage('')
            setprice('')
            setcategory_id('')
            
    }
     


    const addColor=()=>{
        setcolor([...color,''])
    }
const handleChange=(e,index)=>{
        color[index]= e.target.value;
        setcolor([...color])
    }

    const addTaille=()=>{
        settaille([...taille,''])
    }

    const handleChangeTaille=(e,i)=>{
        taille[i]=e.target.value;
        settaille([...taille])

    }

    


        return (
            <div className='container text-center mt-5 border mb-4  font-weight-bolder '>
           <div className='d-flex justify-content-center align-items-center'>
            <h1 className='font-weight-bolder text-center btn-dark w-50 rounded-lg mt-4 mb-4'>Ajouter un nouveau article </h1>
            </div>
                <form onSubmit={handleSubmit}>
            <div className='text-center font-weight-bolder text-success'>{success}</div>
                    <div className="form-group">
                        <label htmlFor="">Categories de l'article</label>
                        <select name="category_id" id="" onChange={(e)=>setcategory_id(e.target.value)} className='form-control'>
                            {
                              category.map(item=><option key={item.id}  value={item.id}>{item.name}</option>)
                            }
                        </select>
                            {
                                message && message.category_id ? <span className='text-danger'>{message.category_id}</span>:''
                              }
                        </div>
                        <div className='form-group'>
                        <label htmlFor="">Title:</label>
                        <input type="text" name='title' value={title} onChange={(e)=>settitle(e.target.value)} className='form-control'/>
                        {
                         message && message.title ? <span className='text-danger'>{message.title}</span>:''
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description:</label>
                        <textarea name='description' value={description} onChange={(e)=>setdescription(e.target.value)} className='form-control'/>
                        {
                         message && message.description ? <span className='text-danger'>{message.description}</span>:''
                        }
                   </div>
                    <div className="form-group">
                        <label htmlFor="">Price:</label>
                        <input type="text" name='price' value={price} onChange={(e)=>setprice(e.target.value)} className='form-control'/>
                        {
                         message && message.price ? <span className='text-danger'>{message.price}</span>:''
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Image:</label>
                        <input type="file" name='image'  onChange={handleChangeFile} className='form-control-file'/>
                        {
                         message && message.image ? <span className='text-danger'>{message.image}</span>:''
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Colors:</label>
                        {
                            color.map((color,index)=>{
                                return(
                                    <div className='form-group' key={index}>
                                   <input     
                                   
                                   type='text'
                                   value={color}
                                   onChange={(e)=>handleChange(e,index)}
                                   />
                                   </div>
                                )
                            })
                        }
                         {
                         message && message.colors ? <span className='text-danger'>{message.colors}</span>:''
                        }
                        <br/>
                        <input type="button" onClick={addColor}  className='btn btn-warning' value='Ajouter un couleur'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Taille:</label>
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
                        {
                         message && message.taille ? <span className='text-danger'>{message.taille}</span>:''
                        }
                        <br/>
                        <input type="button" onClick={addTaille}  className='btn btn-warning mb-3' value='Ajouter un couleur'/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value='Envoyer' className='btn btn-primary w-25 mr-2 buton'/>
                        <input type="reset" value='Annuler' className='btn btn-danger ml-2 w-25 buton'/>

                    </div>
                </form>

            </div>
        );

}

export default PostArticle;
