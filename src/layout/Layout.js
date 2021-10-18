import React from 'react'
import NavBar from '../components/navigation/NavBar'
import Footer from '../components/navigation/Footer'
import './Layout.css'

const Layout = (props) => {
  return(
    <React.Fragment>
      <NavBar />

      <div className="main-content">
        {props.children}
      </div>

      <Footer/>
    </React.Fragment>
  );
}

export default Layout;