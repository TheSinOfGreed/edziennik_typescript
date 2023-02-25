import React from 'react';
import '../styles/Sidenav.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// font awesome
import { faAngleDoubleDown, faPerson, faGraduationCap, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { faPersonCircleExclamation } from '@fortawesome/free-solid-svg-icons';


const Sidenav = (): JSX.Element => {

  return (
    <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion"> {/* sb-sidenav-light/sb-sidenav-dark    */}
            <div className="sb-sidenav-menu" >
                {/* style={{backgroundColor: 'rgb(43, 47, 50)'}} */}
                <div className="nav">
                    <div className="sb-sidenav-menu-heading" style={{color:'#292b2c'}}>Narzędzia</div>
                    <Link to="/home"  style={{textDecoration:'none'}}>
                        <div className="nav-link">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faTable}/></div>
                            Menu
                        </div>
                    </Link>
                    
                    <Link to="/home/frekwencja" style={{textDecoration:'none'}}>
                        <div className="nav-link">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faPerson}/></div>
                            Frekwencja
                        </div>
                    </Link>

                    <Link to="/home/oceny" style={{textDecoration:'none'}}>
                        <div className="nav-link">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faGraduationCap}/></div>
                            Oceny
                        </div>
                    </Link>

                    <Link to="/home/uwagi" style={{textDecoration:'none'}}>
                        <div className="nav-link">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faWarning}/></div>
                            Uwagi
                        </div>
                    </Link>

                    <Link to="/home/praceDomowe" style={{textDecoration:'none'}}>
                        <div className="nav-link">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faMarker}/></div>
                            Prace domowe
                        </div>
                    </Link>

                    <Link to="/home/sprawdziany" style={{textDecoration:'none'}}>
                        <div className="nav-link">
                            <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faFileLines}/></div>
                            Sprawdziany
                        </div>
                    </Link>

                    {sessionStorage.getItem('rola') === 'Dyrektor' ? <>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><FontAwesomeIcon className='fa-lg font-awesome-icon' icon={faPersonCircleExclamation}/></div>
                        Panel Dyrektora
                        <div className="sb-sidenav-collapse-arrow"><FontAwesomeIcon className='font-awesome-icon' icon={faAngleDoubleDown}/></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                        <Link to="/home/dyrektor" style={{textDecoration:'none'}}><div style={{cursor:'pointer'}} className="nav-link">Hub</div></Link>   
                        <Link to="/home/dyrektor/generujToken" style={{textDecoration:'none'}}><div style={{cursor:'pointer'}} className="nav-link">Generuj token</div></Link>
                        </nav>
                    </div>
                    </>: null}
                    
                </div>   
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">{sessionStorage.getItem('nazwa')}</div>
                {sessionStorage.getItem('rola')}
            </div>
        </nav>
    </div>
  )
}

export default Sidenav
