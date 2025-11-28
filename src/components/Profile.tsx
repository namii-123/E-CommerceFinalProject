import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaBars, FaSearch, FaEdit, FaTrash, FaPlus, FaBoxOpen, FaDollarSign, FaChartLine } from "react-icons/fa";
import "../assets/Profile.css";
import { IconContext } from "react-icons"; 

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 45000, stock: 10, image: "https://via.placeholder.com/150?text=Laptop" },
    { id: 2, name: "Smartphone", price: 25000, stock: 15, image: "https://via.placeholder.com/150?text=Smartphone" },
  ]);

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const handleAddOrUpdate = () => {
    if (!newProduct.name || newProduct.price <= 0) return;

    if (newProduct.id) {
      setProducts(products.map((p) => (p.id === newProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }

    setNewProduct({ id: 0, name: "", price: 0, stock: 0, image: "" });
  };

  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) setNewProduct(product);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const totalProducts = products.length;
  const totalRevenue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const totalOrders = 0; // Placeholder
  const revenuePerOrder = totalOrders ? totalRevenue / totalOrders : 0;

  return (
    <div className="dashboard">
      {/* Sidebar */}
       <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2 className="sidebar-logo">LARAVELShop</h2>
        
        <IconContext.Provider value={{ style: { marginRight: "10px" } }}>
          <nav>
            <ul>
              <li className="home" onClick={() => navigate("/home")}>
                <FaHome />Home
              </li>
              <li>
                <FaShoppingCart />Orders
              </li>
              <li className="profile" onClick={() => navigate("/profile")}>
                <FaUser />Profile
              </li>
              <li className="signout-btn" onClick={() => navigate("/login")}>
                Sign Out
              </li>
            </ul>
          </nav>
        </IconContext.Provider>
      </aside>

      {/* Main Content */}
      <main className={`main ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Top Navbar */}
          <header className="top-navbar">
             <span className="menu-icon" onClick={toggleSidebar}> <FaBars /></span>
              <h2>PROFILE PAGE</h2>
              <div className="search-notifications">
                <div className="search-bar">
                  <FaSearch />
                  <input type="text" placeholder="Search products..." />
                </div>
              </div>
            </header>

        {/* User Profile Info */}
<section className="profile-info">
  <div className="profile-card">
    <div className="profile-avatar-wrapper">
      <img className="profile-avatar" src="https://via.placeholder.com/120?text=Avatar" alt="User Avatar"/>
    </div>
    <div className="profile-details">
      <h2>John Doe</h2>
      <p><strong>Email:</strong> john@example.com</p>
      <p><strong>Address:</strong> Valencia, Carcar City Cebu</p>
      <p><strong>Zip Code:</strong> 6019</p>
      <p><strong>Contact Number:</strong> 0905945422</p>
    </div>
  </div>
</section>

      <div className="stats-card">
  <span className="stats-icon">
    <FaBoxOpen />
  </span>
  <h3>Total Products</h3>
  <p>{totalProducts}</p>
</div>

<div className="stats-card">
  <span className="stats-icon">
    <FaDollarSign />
  </span>
  <h3>Total Revenue</h3>
  <p>₱ {totalRevenue.toLocaleString()}</p>
</div>

<div className="stats-card">
  <span className="stats-icon">
    <FaShoppingCart />
  </span>
  <h3>Total Orders</h3>
  <p>{totalOrders}</p>
</div>

<div className="stats-card">
  <span className="stats-icon">
    <FaChartLine />
  </span>
  <h3>Revenue / Order</h3>
  <p>₱ {revenuePerOrder.toFixed(2)}</p>
</div>


        {/* Product Management */}
        <section className="product-management">
          <h2>Add / Update Product</h2>
          <div className="add-product">
            <input
              type="text"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <button onClick={handleAddOrUpdate}><FaPlus /> Add / Update</button>
          </div>

          <div className="marketplace-grid">
            {products.map((p) => (
              <div key={p.id} className="marketplace-card">
                <div className="product-image">
                  <img src={p.image} alt={p.name} />
                </div>
                <h3>{p.name}</h3>
                <p>₱{p.price}</p>
                <p>Stock: {p.stock}</p>
                <div className="actions">
                  <button onClick={() => handleEdit(p.id)}><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(p.id)}><FaTrash /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
