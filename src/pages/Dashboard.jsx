import { useEffect, useState } from "react";
import { API } from "../api";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const loadMyPrices = async () => {
    const res = await fetch(`${API}/api/products/my-prices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadMyPrices();
  }, []);

  const addPrice = async () => {
    const res = await fetch(
      `${API}/api/products/${productId}/add-price`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price: Number(price),
          stock: Number(stock),
        }),
      }
    );

    if (res.ok) {
      alert("Price updated");
      setPrice("");
      setStock("");
      loadMyPrices();
    } else {
      alert("Failed to update price");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Seller Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Add / Update Price</h3>
      <select onChange={(e) => setProductId(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <br />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <br />
      <button onClick={addPrice}>Save</button>

      <hr />

      <h3>My Products</h3>
      {products.map((p) => (
        <div key={p._id}>
          <strong>{p.name}</strong>
          {p.sellers.map((s, i) => (
            <p key={i}>
              ₹{s.price} | Stock: {s.stock}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
