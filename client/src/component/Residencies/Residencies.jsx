import React from 'react'
import {Swiper,SwiperSlide,useSwiper} from "swiper/react"
import "swiper/css"
import "../../component/Residencies/Residencies.css"
import { sliderSettings } from '../../utils/common'
import PropertyCard from '../PropertyCard/PropertyCard'
import { PuffLoader } from "react-spinners";
import useProperties from '../../hooks/useProperties';



const Residencies = () => {


    const { data, isError, isLoading } = useProperties();
    if (isError) {
      return (
        <div className="wrapper">
          <span>Error while fetching the data</span>
        </div>
      );
    }
  
    if (isLoading) {
      return (
        <div className="wrapper flexCenter" style={{ height: "60vh" }}>
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      );
    }


    console.log(data)
  return (
    <section className="r-wrapper">
        <div className="paddings innerWidth r-container">
            <div className="flexColStart r-head ">
                <span className='orangeText'>Best Choice</span>
                <span className='primaryText'>Popular Residencies</span>

            </div>

        <Swiper {...sliderSettings}>

            <SliderButton />

            {
                data.slice(0,8).map((card,i) => (
                    <SwiperSlide key={i}>
                       <PropertyCard card={card}/> 
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </div>
    </section>
  )
}

export default Residencies


const SliderButton = () =>{
    const swiper = useSwiper();
    return(
        <div className="flexCenter r-buttons">

        <button onClick={() => swiper.slidePrev()}>&lt;</button>
        <button onClick={() => swiper.slideNext()}>&gt;</button>

        </div>
    );
};