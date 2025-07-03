import React from "react";
import "./ManageItems.css";
import ItemForm from "../../components/itemForm/ItemForm";
import ItemList from "../../components/itemList/ItemList";
const ManageItems = () => {
  return (
    <div className="items-container text-light">
      <div className="left-column">
        <ItemForm />
      </div>

      <div className="right-column">
        <ItemList />
      </div>
    </div>
  );
};

export default ManageItems;
