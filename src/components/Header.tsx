import { Container, Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const algorithms = [
  {
    name: 'Recursive',
    members: [
      { name: 'Merge Sort', href: '/?algo=merge' },
      { name: '-' },
      {
        name: 'Quick Sort (L/L pointers, Pivot at Start)',
        href: '/?algo=quickllps',
      },
      {
        name: 'Quick Sort (L/L pointers, Pivot at End)',
        href: '/?algo=quickllpe',
      },
      {
        name: 'Quick Sort (L/R pointers, Pivot at Start)',
        href: '/?algo=quicklrps',
      },
      {
        name: 'Quick Sort (L/R pointers, Pivot at End)',
        href: '/?algo=quicklrpe',
      },
      {
        name: 'Quick Sort (L/R pointers, Pivot at Mid)',
        href: '/?algo=quicklrpm',
      },
      { name: '-' },
      { name: 'Bitonic Sort', href: '/?algo=bitonic' },
      { name: 'Radix (LSD) Sort', href: '/?algo=lsd' },
      { name: 'Radix (MSD) Sort', href: '/?algo=msd' },
      { name: '-' },
      { name: 'Stooge Sort', href: '/?algo=stooge' },
    ],
  },
  {
    name: 'Iterative',
    members: [
      { name: 'Selection Sort', href: '/?algo=selection' },
      { name: 'Insertion Sort', href: '/?algo=insertion' },
      { name: 'Bubble Sort', href: '/?algo=bubble' },
      { name: 'Cocktail Sort', href: '/?algo=cocktail' },
      { name: 'Comb Sort', href: '/?algo=comb' },
      { name: 'Shell Sort', href: '/?algo=shell' },
      { name: 'Gnome Sort', href: '/?algo=gnome' },
      { name: 'Odd-Even Sort', href: '/?algo=oddeven' },
      { name: 'Exchange Sort', href: '/?algo=exchange' },
      { name: '-' },
      { name: 'Heap Sort', href: '/?algo=heap' },
      { name: 'Cycle Sort', href: '/?algo=cycle' },
      { name: 'Counting Sort', href: '/?algo=count' },
      { name: '-' },
      { name: 'Pancake Sort', href: '/?algo=pancake' },
      { name: "I Can't Believe It Can Sort", href: '/?algo=believe' },
      { name: 'Bogo Sort', href: '/?algo=bogo' },
      { name: 'Bozo Sort', href: '/?algo=bozo' },
    ],
  },
  {
    name: 'Mixed',
    members: [
      { name: 'Tim Sort', href: '/?algo=tim' },
      { name: 'Intro Sort', href: '/?algo=intro' },
    ],
  },
  {
    name: 'Custom',
    members: [{ name: 'Custom', href: '/' }],
  },
];

export const Header = () => (
  <header>
    <Navbar expand="sm" bg="primary" variant="dark">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav as="ul">
            <Link className="nav-link" to="/home">
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
    {algorithms.map(({ name, members }, i) => (
      <NavDropdown key={i} title={name} drop="end">
        {members.map(({ name, href }, i) =>
          name === '-' ? (
            <NavDropdown.Divider key={i} />
          ) : (
            <Link key={i} className="dropdown-item" to={href!}>
              {name}
            </Link>
          ),
        )}
      </NavDropdown>
    ))}
  </>
);
