import { useState } from "react";
import { API } from "../api";

function Search() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);

  const search = async () => {
    const res = await fetch(`${API}/api/products/search?name=${q}`);
    const data = await res.json();
    setItems(data);
  };
  const styles = {
    card: {
      background: "#fff",
      padding: 15,
      marginTop: 15,
      borderRadius: 6,
    },
  };


  return (
    <div>
      <h2>Search Products</h2>
      <input
        placeholder="Search product"
        onChange={(e) => setQ(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {items.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          {p.sellers.map((s, i) => (
            <p key={i}>
              {s.seller.shopName} – ₹{s.price}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Search;
