import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1>Compare Prices. Save Money.</h1>
      <p>Find best prices from online & local sellers near you.</p>

      <div style={styles.btnGroup}>
        <Link to="/search">
          <button style={styles.primary}>Search Products</button>
        </Link>

        <Link to="/login">
          <button style={styles.secondary}>Seller Login</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
  },
  btnGroup: {
    marginTop: 30,
  },
  primary: {
    padding: "12px 20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    marginRight: 10,
    borderRadius: 6,
  },
  secondary: {
    padding: "12px 20px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: 6,
  },
};

export default Home;
