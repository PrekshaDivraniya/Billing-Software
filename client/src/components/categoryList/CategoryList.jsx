import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import "./CategoryList.css";
import { deleteCategory } from "../../service/CategoryService.js";
import toast from "react-hot-toast";

const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);

  const [searchItem, setSearchItem] = useState("");

  const onRemoveHandler = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status === 204) {
        const updateCategories = categories.filter((c) => c.categoryId != categoryId);
        setCategories(updateCategories);
        toast.success("Category deleted")
      }else{
        toast.error("Unable to delete category")
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete category");
    }

  };

  const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchItem.toLowerCase()))

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
        {filteredCategories.map((category, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">{category.items} Items</p>
                </div>

                <div className="btn btn-danger btn-sm">
                  <i
                    onClick={() => onRemoveHandler(category.categoryId)}
                    className="bi bi-trash"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
