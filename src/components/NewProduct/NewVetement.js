import React,{useState,useContext} from 'react'
import {Badge,Card} from "react-bootstrap";
import Slide from 'react-reveal/Slide';
import "../Css/newProduit.css"
import { dataContext1 } from '../Globals/Global';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function NewVetement(props) {
    
    const [url]=useState('https://shop.ndongodahs.fr/uploads/')
    const {vest,addCart}=useContext(dataContext1)

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };
   

    return (
      <div className='container-fluid'>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >

  {
        vest.map(item=>(
          <Slide right key={item.id}>
          <Card style={{ position:'relative',marginTop: '.8rem'}} className='text-center' >
            <Badge variant="primary" className='position-absolute bage'>Nouveau</Badge>
          {/* <Link to='/'  className='lik btn'>Details</Link> */}

          <Card.Img variant="top" src={url+item.image} className='mt-2 image'  />
          <Card.Body>
          <Card.Title className='text-primary text-uppercase ha'>{item.title}</Card.Title>
          <Card.Text>
          {
              item.category_id===1 ? (
                  <div className='d-flex'>
                    <span className=''>
                      <label>Couleurs:</label>
                      <div className='d-flex  mt-2'>
                          <span className='color' style={{backgroundColor:item.colors[0]}} ></span>
                        <span className='color' style={{backgroundColor:item.colors[1]}}></span>
                        <span className='color' style={{backgroundColor:item.colors[2]}}></span>
                      </div>
                      </span>
                    <span className='text-center taille '>
                        <label htmlFor="taille">Pointure</label>
                    <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                    <option className='text-center text-dark'>{item.taille[0]}</option>
                  <option className='text-center text-dark'>{item.taille[1]}</option>
                    <option className='text-center text-dark'>{item.taille[2]}</option>
                    </select>
                    </span>
                    </div>
                  
                  ): ''
                  }
                  {
                          item.category_id===2 ? (
                            <span>
                        <label htmlFor="taille" className='text-danger'>Taille</label>
                        <select name="taille" id="taille" className='custom-select w-75 mt-2 text-center'>
                      <option className='text-center text-dark'>{item.taille[0]}</option>
                      <option className='text-center text-dark'>{item.taille[1]}</option>
                      <option className='text-center text-dark'>{item.taille[2]}</option>
                    </select>
                            </span>
                          ):''
                      }
                  <span className='font-weight-bold  rounded-lg'>Prix:<span className='form-control'> {item.price}€</span></span>
              </Card.Text>
              
                    <div className='d-flex justify-content-between'>
                  <button variant="primary" className='prime btn' onClick={()=>addCart(item.id)}>Ajouter au panier</button>
                  <button variant="primary" className='prime btn'> Détails</button>
                  </div>
                </Card.Body>
              </Card> 
              </Slide>
              
            ))
        }
        
        </Carousel>
    </div>
    )
}

export default NewVetement
