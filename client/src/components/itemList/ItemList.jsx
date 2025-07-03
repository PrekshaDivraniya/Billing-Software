import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { deleteItem } from '../../service/ItrmService.js';
import toast from 'react-hot-toast';
import './ItemList.css'

const ItemList = () => {

  const [searchItem, setSearchItem] = useState("")

  const {itemsData, setItemsData} = useContext(AppContext);

  const removeItem = async(id) => {
    try {
      const response = await deleteItem(id);
      if(response.status === 204){
        const updatedItems = itemsData.filter(item => item.itemId != id);
        setItemsData(updatedItems);
        toast.success("Item deleted");
      }else{
        toast.error("Unable to delete the item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete the item")
    }
  }

  const filteredItems = itemsData.filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()));

  return (
    <div
      className="category-list-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            className="form-control"
            placeholder="Search by keyword"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
          />

          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="row g-3 pe-2">
        {filteredItems.map((item, index) => (
          <div key={index} className="col-12">
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">{item.catagoryName}</p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    &#8377;{item.price}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => removeItem(item.itemId)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList