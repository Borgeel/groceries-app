import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Groceries List</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
