import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <nav style={styles.nav}>
        <h2 style={{ color: "#fff" }}>PriceHub</h2>
        <div>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/search" style={styles.link}>Search</Link>
          <Link to="/login" style={styles.link}>Seller</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

const styles = {
  nav: {
    background: "#1e293b",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    marginLeft: 20,
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default App;
