import { Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const algorithms = [
  {
    name: "Recursive",
    members: [
      { name: "Merge Sort", href: "/merge" },
      { name: "-" },
      { name: "Quick Sort (L/L pointers, Pivot at Start)", href: "/quickllps" },
      { name: "Quick Sort (L/L pointers, Pivot at End)", href: "/quickllpe" },
      { name: "Quick Sort (L/R pointers, Pivot at Start)", href: "/quicklrps" },
      { name: "Quick Sort (L/R pointers, Pivot at End)", href: "/quicklrpe" },
      { name: "Quick Sort (L/R pointers, Pivot at Mid)", href: "/quicklrpm" },
      { name: "-" },
      { name: "Bitonic Sort", href: "/bitonic" },
      { name: "Radix (LSD) Sort", href: "/lsd" },
      { name: "Radix (MSD) Sort", href: "/msd" },
      { name: "-" },
      { name: "Stooge Sort", href: "/stooge" },
    ],
  },
  {
    name: "Iterative",
    members: [
      { name: "Selection Sort", href: "/selection" },
      { name: "Insertion Sort", href: "/insertion" },
      { name: "Bubble Sort", href: "/bubble" },
      { name: "Cocktail Sort", href: "/cocktail" },
      { name: "Comb Sort", href: "/comb" },
      { name: "Shell Sort", href: "/shell" },
      { name: "Gnome Sort", href: "/gnome" },
      { name: "Odd-Even Sort", href: "/oddeven" },
      { name: "Exchange Sort", href: "/exchange" },
      { name: "-" },
      { name: "Heap Sort", href: "/heap" },
      { name: "Cycle Sort", href: "/cycle" },
      { name: "Counting Sort", href: "/count" },
      { name: "-" },
      { name: "Pancake Sort", href: "/pancake" },
      { name: "I Can't Believe It Can Sort", href: "/believe" },
      { name: "Bogo Sort", href: "/bogo" },
      { name: "Bozo Sort", href: "/bozo" },
    ],
  },
  {
    name: "Mixed",
    members: [
      { name: "Tim Sort", href: "/tim" },
      { name: "Intro Sort", href: "/intro" },
    ],
  },
  {
    name: "Custom",
    members: [{ name: "Custom", href: "/" }],
  },
];

const Header = () => (
  <header>
    <Navbar expand="sm">
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

const Algorithms = () =>
  algorithms.map(({ name, members }, i) => (
    <NavDropdown key={i} title={name} drop="end">
      {members.map(({ name, href }, i) =>
        name === "-" ? (
          <NavDropdown.Divider key={i} />
        ) : (
          <NavDropdown.Item key={i} href={href}>
            {name}
          </NavDropdown.Item>
        )
      )}
    </NavDropdown>
  ));

export default Header;
