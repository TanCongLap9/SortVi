import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import data from '../data.json';

export const Header = () => (
  <header>
    <Navbar expand="sm" bg="primary" variant="dark">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="ul">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <NavDropdown as="li" title="Algorithms">
              <Algorithms />
            </NavDropdown>
            <Link className="nav-link" to="/api">
              API
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

const Algorithms = () => (
  <>
    {data.algorithms.map(({ name, members }, i) => (
      <NavDropdown key={i} title={name} drop="end">
        {members.map(({ name, href }, i) =>
          name === '-' ? (
            <NavDropdown.Divider key={i} />
          ) : (
            <Link key={i} className="dropdown-item" to={href!}>
              {name}
            </Link>
          )
        )}
      </NavDropdown>
    ))}
  </>
);
