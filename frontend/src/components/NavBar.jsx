import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Logo.svg"

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75 rem" }}>
      <Container>
        <img src={logo} height="90px"/>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Live Chat App
          </Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in {user?.user_name}</span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
