import React, { useState } from 'react'
import axios from 'axios'



 const PostCategory=()=> {

    const [name,setname]=useState('')
    const [message,setmessage]=useState('')
    const [success,setsuccess]=useState('')


const handleChange=(e)=>{
        setname(e.target.value)
}



   const handleSubmit=(e)=>{
        e.preventDefault();
            
          const fd=new FormData();
          fd.append('name',name)
        const headers={
            // 'Content-Aype':'application/json',
            // 'Access-Control-Allow-Origin':'*'
            headers : {
              "react_token" : localStorage.getItem('react_token'),
            }
        }
        axios.post('https://shop.ndongodahs.fr/api/postCategory',fd, headers)
            .then(res=>
            {
                  setsuccess(res.data.message)
                   //this.myFormRef.reset();
                   
            })
             .catch(error=>{
                setmessage(error.response.data.errors)
             })
      setname('')
    }

        return (
              <div className='container text-center mb-5 h-100'>
                  <h1 className='text-center text-capitalize text-danger mt-5 mb-5'>Ajouter une nouvelle Catégorie</h1>
                   <p className='text-center mt-5 mb-5 text-success font-italic font-weight-bold'>{success}</p>
                  {/*<p className='text-center mt-5 mb-5 text-danger font-italic font-weight-bold'>{error}</p> */}
                <div className='form-group    text-center '>
                <form onSubmit={handleSubmit}  className='mt-5 bg-info    form-group d-flex align-items-center flex-column justify-content-center' >
                <div className="form-group ">
                <label htmlFor="nom" className='col-form-label font-weight-bolder text-capitalize'>Nom Category</label>
                <input type="text" name='name' className='text-center form-control p-2 mt-3' onChange={handleChange}/>
                {
                 message && message.name ? <span className='text-danger'>{message.name}</span>:''
               }
                 </div>
                <div className="form-group">
                <input type="submit" className='btn btn-primary rounded p-2 buton'/>
                    </div>
                </form>
                    </div>
              </div>
        )

}


 export default PostCategory