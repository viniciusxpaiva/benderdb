
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <>
        <footer style={{position:"absolute", bottom: 0, width: "100%", height: "0.5rem"}}>
        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
        <MDBContainer className='pt-4'>
        <section className='mb-4 text-dark'>
        <a className="text-decoration-none" href="https://homepages.dcc.ufmg.br/~sabrinas" target="_blank" rel="noopener noreferrer">LaBio Laboratory of Bioinformatics, Visualization and Systems</a>
          
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright BENDER DB
      </div>
    </MDBFooter>
        </footer>
        <script type="text/javascript" src="//www.privacypolicies.com/public/cookie-consent/4.0.0/cookie-consent.js" charset="UTF-8"></script>
        <script  src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>        
        </>
    );
    
}
export default Footer;