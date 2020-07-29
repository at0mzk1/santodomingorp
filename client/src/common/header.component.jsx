import React, { Component} from 'react';
import { MDBNavbar , MDBNavbarBrand, MDBContainer } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import './header.css';

class Header extends Component {

    render() {
        return (
            <Router>
                <div>
                    <MDBNavbar
                    color="primary-color"
                    dark
                    expand="md"
                    fixed="top"
                    scrolling
                    transparent
                    >
                        <MDBContainer>
                            <MDBNavbarBrand>
                                <strong>SantoDomingoRP</strong>
                            </MDBNavbarBrand>
                        </MDBContainer>
                    </MDBNavbar>
                </div>
            </Router>        
        );
    }
}

export default Header;