import React, { useContext, useState } from "react";
import "./Explore.css";
import { AppContext } from "../../context/AppContext.jsx";
import DisplayCategory from "../../components/displayCategories/DisplayCategory.jsx";
import DisplayItems from "../../components/displayItems/DisplayItems.jsx";
import CustomerForm from "../../components/customerForm/CustomerForm.jsx";
import CartItem from "../../components/cartItems/CartItem.jsx";
import CartSummary from "../../components/cartSummary/CartSummary.jsx";

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: "auto" }}>
          <DisplayCategory
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: "auto" }}>
          <DisplayItems selectedCategory={selectedCategory} />
        </div>
      </div>
      <div className="right-column d-flex flex-column" style={{ minHeight: 0 }}>
        {/* Fixed customer form */}
        <div className="customer-form-container" style={{ flexShrink: 0 }}>
          <CustomerForm
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
          />
        </div>

        <hr className="my-3 text-light" />

        {/* Scrollable cart items only */}
        <div
          className="cart-items-container"
          style={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}
        >
          <CartItem />
        </div>

        {/* Fixed cart summary with buttons including Place Order */}
        <div className="cart-summary-container" style={{ flexShrink: 0 }}>
          <CartSummary
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
