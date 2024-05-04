import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/category'>Category</Link>
            </li>

            <li>
              <Link to='/courses'>Courses</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/team'>Team</Link>
            </li>
            <li>
              <Link to='/mycourses'>My Courses</Link>
            </li>
            {/* <li>
              <Link to='/pricing'>Pricing</Link>
            </li> */}
            {/* <li>
              <Link to='/journal'>Journal</Link>
            </li> */}
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>

          {/* <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/courses">All Courses</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/journal">Journal</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul> */}

          <div className='start'>
            <div className='button'>GET CERTIFICATE</div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
