import React from 'react';
// import '../styles/Main-styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// bootstrap js script
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
// Font awesome style
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { NavigateFunction, useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate: NavigateFunction = useNavigate();

  const hideSidebar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
  }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark" >
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand ps-3" href="/">E-<span style={{color:'blue'}}>D</span>ziennik</a>
        {/* <!-- Sidebar Toggle--> */}
        <button onClick={(event): void=>{hideSidebar(event)}} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" style={{color:'rgba(255, 255, 255, 0.5)'}}> <FontAwesomeIcon icon={faArrowsLeftRight}/> </button>
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group" style={{color:'white', fontSize: '20px', fontWeight: '700', cursor: 'default'}}>
                Profil
            </div>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {/* <FontAwesomeIcon className="fa-fw" icon={faUser}/> */}
                    <img alt="Avatar" style={{width:'35px', height:'35px', borderRadius:'50%'}} src={require('../images/img_avatar.png')} /> 
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><div style={{cursor:'pointer'}} className="dropdown-item">Informacje o koncie</div></li>
                    <li><div style={{cursor:'pointer'}} className="dropdown-item">Ustawienia</div></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><div style={{cursor:'pointer'}} className="dropdown-item" onClick={(): void=>{sessionStorage.removeItem('18062002'); navigate('/')}}>Wyloguj</div></li>
                </ul>
            </li>
        </ul>
    </nav>
  )
}

export default Home
