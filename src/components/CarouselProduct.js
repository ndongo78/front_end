import React,{useState} from 'react';
import {Carousel} from "react-bootstrap";
import photo1 from '../components/images/vetement1.jpg'
import photo2 from '../components/images/vetement.jpg'
import photo3 from '../components/images/fashionable-black-and-white-sneakers.jpg'




function CarouselProduct() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} className='w-100 m-0 h-75'>
        <Carousel.Item>
          <img
            className="d-block w-100 photoCarousel"
            src={photo1}
            alt="First slide"
          />
          <Carousel.Caption>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 photoCarousel"
            src={photo3}
            alt="Second slide"
          />
  
          <Carousel.Caption>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 photoCarousel"
            src={photo2}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  export default CarouselProduct