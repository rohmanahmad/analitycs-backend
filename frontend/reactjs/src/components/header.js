import React, { Component, Fragment } from 'react';

import FullLogo from '../assets/coreui/img/brand/logo.svg'
import MinLogo from '../assets/coreui/img/brand/sygnet.svg'

// childs components
import HeaderLeftMenu from './childs/header.left.menu'
import HeaderRightMenu from './childs/header.right.menu'

function Logo () {
   return (
      <a className="navbar-brand" href="#">
         <img className="navbar-brand-full" src={FullLogo} width="89" height="25" alt="Logo" />
         <img className="navbar-brand-minimized" src={MinLogo} width="30" height="30" alt="Logo" />
      </a>
   )
}

class Header extends Component {
   render() {
      return (
         <React.Fragment>
            <header className="app-header navbar">
               <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
                  <span className="navbar-toggler-icon"></span>
               </button>
               {/* <Logo/> */}&nbsp;
               <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <HeaderLeftMenu/>
               <HeaderRightMenu/>
            </header>
         </React.Fragment>
      )
   }
}

export default Header