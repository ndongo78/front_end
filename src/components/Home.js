import React,{useState,useContext} from 'react'
import '../components/Css/carousel.css'
import Fade from 'react-reveal/Fade';
import CarouselProduct from './CarouselProduct';
import NewVetement from './NewProduct/NewVetement'
import NewChaussure from './NewProduct/NewChaussure'
import NewAccessoire from './NewProduct/NewAccessoire'
import { dataContext1 } from './Globals/Global';


const Accueil=()=> {
    const {promo}=useContext(dataContext1)
    const [showVetement,setshowVetement]=useState(true)
    const [showChaussure,setshowChaussure]=useState(false)
    const [showAccessoire,setshowAccessoire]=useState(false)

    const [checked,setchecked]=useState('')
    const [checked2,setchecked2]=useState('')
    const [checked3,setchecked3]=useState('')
     
    const handleVetement=()=>{
      setshowVetement(true)
      setshowChaussure(false)
      setshowAccessoire(false)
      setchecked('rgb(250, 128, 114)')
      setchecked2('')
      setchecked3('')
    }
    const handleChaussure=()=>{
        setshowChaussure(true)
        setshowVetement(false)
        setshowAccessoire(false)
        setchecked2('rgb(250, 128, 114)')
        setchecked('')
        setchecked3('')
        
      }
      const handleAccessoire=()=>{
        setshowAccessoire(true)
        setshowVetement(false)
        setshowChaussure(false)
        setchecked3('rgb(250, 128, 114)')
        setchecked2('')
        setchecked('')
      }


    return (
        <>
           <Fade left>
            <div className=' border-0 container-fluid'>
               <CarouselProduct />
            </div>
            </Fade>
            <Fade right>
            <div className=' container-fluid accueil '>
            
            <h2 className='text-center mt-4 mb-4'>Nouveau Arrivage</h2>
                <div className='d-flex align-items-center justify-content-center item'>
                    <ul className='d-flex cat'>
                        <li className='btn active' onClick={handleVetement} style={{backgroundColor: checked}} >Vétements</li>
                        <li className='btn ' onClick={handleChaussure} style={{backgroundColor: checked2}} >Chaussures</li>
                        <li className='btn' onClick={handleAccessoire} style={{backgroundColor: checked3}}>Accéssoires</li>
                    </ul>
                </div>
                  {
                      showVetement && <NewVetement />
                  }
                  {
                      showChaussure && <NewChaussure />
                  }
                  {
                      showAccessoire && <NewAccessoire />
                  }
                 
                   <Fade left>
                    <div className='banner'>
                        {
                            promo.map(item=>(
                            <p className='typical' key={item.id}>{item.description}</p>
                            ))
                        }
                  
                    </div>
                    </Fade>
                 </div>
                  </Fade>
           </>
    )
}

export default Accueil
