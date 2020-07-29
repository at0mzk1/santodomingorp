import React, { Component } from 'react';
import { MDBContainer, MDBView, MDBMask, MDBRow, MDBCol, MDBAnimation, MDBBtn } from 'mdbreact';
import ReCAPTCHA from 'react-google-recaptcha'
import './home.css';

class Home extends Component {

    constructor() {
        super();
        this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);
      }

  render() {
      return (
        <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <MDBCol
                md="6"
                className="white-text text-center text-md-left mt-xl-5 mb-5"
              >
                <MDBAnimation type="fadeInLeft" delay=".3s">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">
                    Santo Domingo RolePlay
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Para acceder a nuestro servidor, completa el captcha y
                    presiona el boton para entrar.
                  </h6>
                  <ReCAPTCHA
                  ref={(el) => { this.recaptcha = el; }}
                  sitekey="6LcTLbUZAAAAAFAMvPGplQeU1_ENim-a-ozDshxu"
                  onChange={this.handleCaptchaResponseChange}
                  />
                  <MDBBtn color="white">Entrar</MDBBtn>
                </MDBAnimation>
              </MDBCol>

              <MDBCol md="6" xl="5" className="mt-xl-5">
                <MDBAnimation type="fadeInRight" delay=".3s">
                  <img
                    src="https://cdn.discordapp.com/attachments/716150256839950368/735934226268160040/LOGO_610X610_TRANSP.png"
                    alt=""
                    className="img-fluid"
                  />
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
      )
  }

  handleCaptchaResponseChange = (response) => {
	
    this.setState({
  
      recaptchaResponse: response,
  
    });
  
  }

}

export default Home;