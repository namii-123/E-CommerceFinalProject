import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaBars, FaSearch, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IconContext } from "react-icons"; 
import "../assets/Dashboard.css";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string; 
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleOrdersDropdown = () => setOrdersDropdownOpen(!ordersDropdownOpen);

  const [products] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 45000, stock: 10, image: "https://via.placeholder.com/150?text=Laptop" },
    { id: 2, name: "Smartphone", price: 25000, stock: 15, image: "https://via.placeholder.com/150?text=Smartphone" },
    { id: 3, name: "Headphones", price: 5000, stock: 20, image: "https://via.placeholder.com/150?text=Headphones" },
    { id: 4, name: "Camera", price: 18000, stock: 8, image: "https://via.placeholder.com/150?text=Camera" },
    { id: 5, name: "Watch", price: 8000, stock: 12, image: "https://via.placeholder.com/150?text=Watch" },
    { id: 6, name: "Keyboard", price: 2500, stock: 30, image: "https://via.placeholder.com/150?text=Keyboard" },
    { id: 7, name: "Mouse", price: 1500, stock: 40, image: "https://via.placeholder.com/150?text=Mouse" },
    { id: 8, name: "Printer", price: 12000, stock: 5, image: "https://via.placeholder.com/150?text=Printer" },
    { id: 9, name: "Speaker", price: 4000, stock: 18, image: "https://via.placeholder.com/150?text=Speaker" },
    { id: 10, name: "Tablet", price: 18000, stock: 14, image: "https://via.placeholder.com/150?text=Tablet" },
  ]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <h2 className="sidebar-logo">GreenieCart</h2> 
       {/*<img src="/logo.png"  alt="GreenieCart Logo" className="sidebar-logo" /> */}

  <IconContext.Provider value={{ style: { marginRight: "10px" } }}>
    <nav>
      <ul>
        <li className="home" onClick={() => navigate("/home")}>
          <span className="left"><FaHome />Home</span>
        </li>
        <li className="orders" onClick={toggleOrdersDropdown}>
  <span className="left">
    <FaShoppingCart /> Orders
  </span>
  <span className="orders-arrow">
    {ordersDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
  </span>
</li>

{ordersDropdownOpen && (
  <ul className="dropdown">
    <li onClick={() => navigate("/customerorders")}>Customer Orders</li>
    <li onClick={() => navigate("/myorders")}>Your Orders</li>
  </ul>
)}
        <li className="profile" onClick={() => navigate("/profile")}>
          <span className="left"><FaUser />Profile</span>
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
  <IconContext.Provider value={{ style: { marginRight: "8px" } }}>
    
  
    <header className="top-navbar">
     <span className="menu-icon" onClick={toggleSidebar}> <FaBars /></span>
      <h2>WELCOME TO GREENIECART</h2>
      <div className="search-notifications">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search products..." />
        </div>
      </div>
    </header>

    {/* Product grid */}
    <section className="marketplace">
      <div className="marketplace-grid">
        {products.map((p) => (
          <div key={p.id} className="marketplace-card">
            <div className="product-image">
              <img src={p.image} alt={p.name} />
            </div>
            <h3>{p.name}</h3>

            <div className="product-info">
                <span>₱{p.price.toLocaleString()}</span>
                <span>Stock: {p.stock}</span>
            </div>

            <div className="product-actions">
                <button className="add-cart-btn"><FaShoppingCart /></button>
                <button className="buy-btn">Buy</button>
            </div>

          </div>
        ))}
      </div>
    </section>

  </IconContext.Provider> 
</main>
    </div>
  );
};

export default Dashboard;


  
