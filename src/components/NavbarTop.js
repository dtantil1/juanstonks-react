import {Navbar, Nav, Container} from "react-bootstrap"
import './NavBarTop.css'
function NavbarTop(){
    return(
        <div>
            <Navbar className="navigationbar" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">JS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">About</Nav.Link>
                            <Nav.Link href="#link">Contact Us</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavbarTop;