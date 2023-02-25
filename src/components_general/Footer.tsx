import React from 'react'
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter} from '@fortawesome/free-brands-svg-icons'
import { faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faFacebook} from '@fortawesome/free-brands-svg-icons'
import { faInstagram} from '@fortawesome/free-brands-svg-icons'

function Footer(): JSX.Element {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
            
          <div className="text-muted">Edziennik &copy; 2022</div>
          
          <div>
            <FontAwesomeIcon className='fa-lg' style={{marginLeft:'5px', color:'#1DA1F2'}} icon={faTwitter} />
            <FontAwesomeIcon className='fa-lg' style={{marginLeft:'5px', color:'#0e76a8'}} icon={faLinkedin} />
            <FontAwesomeIcon className='fa-lg' style={{marginLeft:'5px', color:'#4267B2'}} icon={faFacebook} />
            <FontAwesomeIcon className='fa-lg' style={{marginLeft:'5px', color:'#C13584'}} icon={faInstagram} />
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
