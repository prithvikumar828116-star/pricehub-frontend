import { useState } from "react";
import { API_BASE } from "./api";

function App() {
  // Search
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add product
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  // Add seller price
  const [productId, setProductId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Create product
  const addProduct = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/products/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, brand, category }),
      });
      const data = await res.json();
      alert("Product added successfully.\nCheck console for Product ID.");
      console.log("PRODUCT ID:", data._id);
    } catch (e) {
      console.error(e);
      alert("Error adding product");
    }
  };

  // Add seller price
  const addPrice = async () => {
    try {
      await fetch(`${API_BASE}/api/products/${productId}/add-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerId,
          price: Number(price),
          stock: Number(stock),
        }),
      });
      alert("Seller price added successfully");
    } catch (e) {
      console.error(e);
      alert("Error adding price");
    }
  };

  // Search products
  const search = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/products/search?name=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      setItems(data || []);
    } catch (e) {
      console.error(e);
      alert("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>PriceHub 🔍</h1>

      {/* ADD PRODUCT */}
      <h2>Add Product</h2>
      <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>

      <hr />

      {/* ADD SELLER PRICE */}
      <h2>Add Seller Price</h2>
      <input placeholder="Product ID" onChange={(e) => setProductId(e.target.value)} />
      <input placeholder="Seller ID" onChange={(e) => setSellerId(e.target.value)} />
      <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
      <button onClick={addPrice}>Add Price</button>

      <hr />

      {/* SEARCH */}
      <h2>Search Product</h2>
      <input
        placeholder="Search (e.g. galaxy)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {loading && <p>Loading...</p>}

      {/* RESULTS */}
      {items.map((p) => (
        <div key={p._id} style={{ marginTop: 20 }}>
          <h3>{p.name}</h3>
          <small>{p.brand} • {p.category}</small>

          <table border="1" cellPadding="6" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>Seller</th>
                <th>Type</th>
                <th>Location</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {p.sellers.map((s, i) => (
                <tr key={i}>
                  <td>{s.seller.shopName}</td>
                  <td>{s.seller.sellerType}</td>
                  <td>{s.seller.location}</td>
                  <td>₹{s.price}</td>
                  <td>{s.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
