import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Promo() {

    const [description,setdescription]=useState('')
    const [message,setmessage]=useState('')
    const [success,setsuccess]=useState('')
    const [id,setid]=useState('')

    useEffect(() => {
        const headers={
            // 'Content-Aype':'application/json',
            // 'Access-Control-Allow-Origin':'*'
            headers : {
              "react_token" : localStorage.getItem('react_token'),
            }
        }
        //get promotion
     axios.get('https://shop.ndongodahs.fr/api/getPromo',headers)
     .then((res)=>{
           setdescription(res.data[0].description)
           setid(res.data[0].id);
     })
     .catch((error)=>{
         return error.response
     })
    }, [])
     

    const handleSubmit=(e)=> {
        e.preventDefault();
        const fd = new FormData();
        fd.append('description',description)
        fd.append('id',id)
        const headers={
            // 'Content-Aype':'application/json',
            // 'Access-Control-Allow-Origin':'*'
            headers : {
              "react_token" : localStorage.getItem('react_token'),
            }
        }

    axios.post('https://shop.ndongodahs.fr/api/promo',fd,headers)
        .then((res)=>{
                 setsuccess(res.data.message)
        })
        .catch((error)=>{
            setmessage(error.response.data.errors)
        })

    }

    return (
        <div className='container text-center mt-5 border mb-4  font-weight-bolder '>
            <div className='d-flex justify-content-center align-items-center'>
            <h1 className='font-weight-bolder text-center btn-dark w-50 rounded-lg mt-4 mb-4'>Proposer une promotion </h1>
            </div>
            <form  onSubmit={handleSubmit}>
            <div className='text-center font-weight-bolder text-success'>{success}</div>
            <div className="form-group">
                <label htmlFor="">Description:</label>
                <textarea name='description' value={description} onChange={(e)=>setdescription(e.target.value)} className='form-control'/>
                {
                    message && message.description ? <span className='text-danger'>{message.description}</span>:''
                }
                   </div>
                   <div className="form-group">
                        <input type="submit" value='Envoyer' className='btn btn-primary w-25 mr-2 buton'/>
                        <input type="reset" value='Annuler' className='btn btn-danger ml-2 w-25 buton'/>

                    </div>
            </form>
            
        </div>
    )
}
