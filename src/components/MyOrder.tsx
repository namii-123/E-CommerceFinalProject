import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaHome, FaShoppingCart, FaUser, FaBars, FaSearch, FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons"; 
import "../assets/MyOrder.css";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const MyOrder: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);

  // Sample cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Organic Apple", image: "/images/apple.jpg", price: 50, quantity: 2 },
    { id: 2, name: "Banana Bunch", image: "/images/banana.jpg", price: 30, quantity: 1 },
    { id: 3, name: "Almond Milk", image: "/images/almond-milk.jpg", price: 120, quantity: 1 },
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleOrdersDropdown = () => setOrdersDropdownOpen(!ordersDropdownOpen);

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, qty: number) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2 className="sidebar-logo">GreenieCart</h2>
        <IconContext.Provider value={{ style: { marginRight: "10px" } }}>
          <nav>
            <ul>
              <li className="home" onClick={() => navigate("/home")}><span className="left"><FaHome />Home</span></li>
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
              <li className="profile" onClick={() => navigate("/profile")}><span className="left"><FaUser />Profile</span></li>
              <li className="signout-btn" onClick={() => navigate("/login")}>Sign Out</li>
            </ul>
          </nav>
        </IconContext.Provider>
      </aside>

      {/* Main Content */}
      <main className={`main ${sidebarOpen ? "sidebar-open" : ""}`}>
        <IconContext.Provider value={{ style: { marginRight: "8px" } }}>
          <header className="top-navbar">
            <span className="menu-icon" onClick={toggleSidebar}><FaBars /></span>
            <h2>MY ORDERS</h2>
            <div className="search-notifications">
              <div className="search-bar">
                <FaSearch />
                <input type="text" placeholder="Search products..." />
              </div>
            </div>
          </header>

          {/* Cart Section */}
          <div className="cart-container">
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td className="cart-product">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </td>
                      <td>₱{item.price}</td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        />
                      </td>
                      <td>₱{item.price * item.quantity}</td>
                      <td>
                        <FaTrash className="remove-btn" onClick={() => handleRemove(item.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {cartItems.length > 0 && (
              <div className="cart-summary">
                <h4>Total: ₱{totalPrice}</h4>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </IconContext.Provider>
      </main>
    </div>
  );
};

export default MyOrder;
