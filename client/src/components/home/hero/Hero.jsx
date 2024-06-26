import React from "react"
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { Link } from 'react-router-dom'; 


const Hero = () => {
  // const handleClick = () => {
  //   // Navigate to the desired URL
  //   window.location.href = '/signup'; // Replace '/other-page' with the actual URL
  // };
  return (
    <>
      <section className='hero' id="home">
        <div className='container' >
          <div className='row'>
            <Heading subtitle='WELCOME TO PATHSHALA' title='Best Online Education Platform' />
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <div className='button'>
              <button className='primary-btn'>
                <Link to='/signup'>GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i></Link>
              </button>
              <button>
                <Link to='/courses'>VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i></Link>

                
              </button> 
              {/* <a href="/courses" className="primary-btn button">
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </a> */}

            </div>
          </div>
        </div>
      </section>
      {/* <div className='margin'></div> */}
    </>
  )
}

export default Hero
