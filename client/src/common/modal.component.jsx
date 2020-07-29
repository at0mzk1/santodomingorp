import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

render() {
  return (
    <MDBContainer>
      <MDBModal centered isOpen={this.props.show} size="lg">
        <MDBModalHeader>Hemos detectado un Adblocker</MDBModalHeader>
        <MDBModalBody>
          Para poder acceder, por favor deshabilita tu adblocker.
        </MDBModalBody>
        <MDBModalFooter>
          Santo Domingo Roleplay
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;