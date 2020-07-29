import React from "react";
import Header from './common/header.component';
import ReCAPTCHA from 'react-google-recaptcha';
import AdblockModal from './common/modal.component';
import api from './util/api.js';
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation
} from "mdbreact";
import "./App.css";

class AppPage extends React.Component {

  constructor() {
    super();
    this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);
    this.lgClose = this.lgClose.bind(this);
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(json => {
        this.setState({ 
          show: false,
          clientIp: json.ip,
        });
      });
    this.state = {
      show: false,
      recaptchaResponse: false,
      clientIp: null
    };
  }

  lgClose() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    let captcha;
    if(this.state.clientIp == null && !this.state.show) {
      this.lgClose()
      captcha = null;
    } else if(this.state.clientIp != null && !this.state.show) {
      captcha = <ReCAPTCHA
      ref={(el) => { this.recaptcha = el; }}
      sitekey="6LcTLbUZAAAAAFAMvPGplQeU1_ENim-a-ozDshxu"
      onChange={this.handleCaptchaResponseChange}
      />
    }
    return (
        <div id="apppage">
          <Header/>
          <MDBView>
            <AdblockModal show={this.state.show} toggle={this.lgClose} />
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
                        Tu IP es: {this.state.clientIp}
                      </h6>
                      <h6 className="mb-4">
                        Para poder disfrutar de nuestra ciudad, completa el captcha y
                        presiona el boton para entrar.
                      </h6>
                      {captcha}
                      <MDBBtn color="white" disabled={!this.state.recaptchaResponse}>
                        <a href="fivem://connect/51.81.49.59:59867">Entrar</a>
                      </MDBBtn>
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
        </div>
      );
  }

  handleCaptchaResponseChange = (token) => {
    var data = {
      hello: 'hello',
      token: token,
      ip: this.state.clientIp
    };
    let that = this;
    api.post('/send', {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
        }, null, data, function (response) {
          that.setState({
            recaptchaResponse: response.google_response.success,
          });
        });
  }
}


export default AppPage;
