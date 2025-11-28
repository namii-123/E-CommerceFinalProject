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
  category: string;        
  image: string | File;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 45000, stock: 10, category: "electronics", image: "https://via.placeholder.com/150?text=Laptop" },
    { id: 2, name: "Smartphone", price: 25000, stock: 15, category: "electronics", image: "https://via.placeholder.com/150?text=Smartphone" },
  ]);

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });

  const handleAddOrUpdate = () => {
    if (!newProduct.name || newProduct.price <= 0) return;

    if (newProduct.id) {
      setProducts(products.map((p) => (p.id === newProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }

    setNewProduct({ id: 0, name: "", price: 0, stock: 0, category: "", image: "" });
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
        <h2 className="sidebar-logo">GreenieCart</h2>
        
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
        <section className="profile-container">
  <div className="profile-header-row">
    <div className="profile-user-block">
      <img
        className="profile-avatar"
        src="https://via.placeholder.com/120"
        alt="User Avatar"
      />

      <div className="profile-user-text">
        <h3>Jamaiah Shane Cabigas</h3>
        <p className="email">jamaiahshane@gmail.com</p>
      </div>
    </div>

    <button className="edit-btn">Edit</button>
  </div>

  <div className="profile-display-grid">

  <div className="display-row">
    <label>Address</label>
    <p>Valencia, Carcar City, Cebu</p>
  </div>

  <div className="display-row">
    <label>Contact Number</label>
    <p>09134567891</p>
  </div>

  <div className="display-row">
    <label>Gender</label>
    <p>Female</p>
  </div>

  <div className="display-row">
    <label>Birthday</label>
    <p>September 22, 2004</p>
  </div>

  <div className="display-row">
    <label>Age</label>
    <p>20</p>
  </div>

  <div className="display-row">
    <label>Zip Code</label>
    <p>6019</p>
  </div>

</div>


  <div className="email-section">
    <label className="email-title">My Email Addresses</label>

    <div className="email-item">
      <span className="email-icon">📧</span>
      <div>
        <p className="email-main">jamaiahshanecabigas@gmail.com</p>
      </div>
    </div>

    <button className="add-email-btn">+ Add Email Address</button>
  </div>
</section>


    <div className="profile-stats">
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
</div>

        {/* Product Management */}
        <section className="product-management">
  <h2>Add / Update Product</h2>

  <div className="add-product">

    <label>
      Product Name
      <input
        type="text"
        placeholder="Enter product name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />
    </label>

    <label>
      Price
      <input
        type="number"
        placeholder="Enter price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: Number(e.target.value) })
        }
      />
    </label>

    <label>
      Stock
      <input
        type="number"
        placeholder="Enter stock"
        value={newProduct.stock}
        onChange={(e) =>
          setNewProduct({ ...newProduct, stock: Number(e.target.value) })
        }
      />
    </label>

    <label>
      Category
      <select
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
      >
        <option value="">Select Product Category</option>
        <option value="plants">Plants</option>
        <option value="herbs">Herbs</option>
        <option value="equipments">Planting Equipments</option>
      </select>
    </label>

    <label>
      Product Image
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setNewProduct({ ...newProduct, image: e.target.files ? e.target.files[0] : newProduct.image,})
        }
      />
    </label>

    <button onClick={handleAddOrUpdate}>
      <FaPlus /> Add / Update
    </button>
  </div>

  <div className="marketplace-grid">
    {products.map((p) => (
      <div key={p.id} className="marketplace-card">

        <div className="product-image">
          <img
            src={
              typeof p.image === "string"
                ? p.image
                : URL.createObjectURL(p.image)
            }
            alt={p.name}
          />
        </div>

        <h3>{p.name}</h3>
        <div className="added-product">
              <span>₱{p.price}</span>
              <span>Stock: {p.stock}</span>
        </div>
  
        <p className="category">Category: {p.category}</p>

        <div className="actions">
          <button onClick={() => handleEdit(p.id)}>
            <FaEdit /> Edit
          </button>
          <button onClick={() => handleDelete(p.id)}>
            <FaTrash /> Delete
          </button>
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
