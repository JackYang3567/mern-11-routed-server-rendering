import HomeIcon from 'react-icons/lib/fa/home';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueAddNavItem from '../issue/IssueAddNavItem.jsx';


//import './menus.scss';

const selectedStyle = {
    backgroundColor: "white",
    color: "red"
}

export const HeaderMenu = () =>
    <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Issue Tracker</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/">
                    <NavItem><HomeIcon/></NavItem>
                </LinkContainer>

                <LinkContainer to="/about">
                    <NavItem>About</NavItem>
                </LinkContainer>

                <LinkContainer to="/issues">
                    <NavItem>Issues</NavItem>
                </LinkContainer>

                <LinkContainer to="/events">
                    <NavItem>Events</NavItem>
                </LinkContainer>

                <LinkContainer to="/products">
                    <NavItem>Products</NavItem>
                </LinkContainer>

                <LinkContainer to="/contact">
                    <NavItem>Contact Us</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
            </Nav>
            <Nav pullRight>
                <IssueAddNavItem />
                <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
                    <MenuItem>Logout</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>


export const FooterMenu = ({ match }) =>
    <footer className="footer-menu">
        <hr />
        <h5><small>
            Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">
            GitHub repository</a>.
        </small>
        </h5>
    </footer>

export const AboutMenu = ({ match }) =>
    <Navbar fluid>
        <Nav>

            <LinkContainer to="/about"
                activeStyle={ selectedStyle}>
                <NavItem>Company</NavItem>
            </LinkContainer>

            <LinkContainer to="/about/history"
                activeStyle={selectedStyle}>
                <NavItem>History</NavItem>
            </LinkContainer>

            <LinkContainer to="/about/services"
                activeStyle={selectedStyle}>
                <NavItem>Services</NavItem>
            </LinkContainer>

            <LinkContainer to="/about/location"
                activeStyle={selectedStyle}>
                <NavItem>Location</NavItem>
            </LinkContainer>
            
        </Nav>
    </Navbar>    
