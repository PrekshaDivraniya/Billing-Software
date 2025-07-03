import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "../../service/ItrmService";

const ItemForm = () => {
  const {categories, setCategories} = useContext(AppContext);
  const {setItemsData, itemsData} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data, [name]:value}));
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file",image);

    try {
      if (!image) {
        toast.error("Select image for item");
        return;
      }
      const response = await addItem(formData);

      if (response.status === 201) {
        setItemsData([...itemsData, response.data]);
        setCategories((prev) => prev.map((cat) => cat.categoryId === data.categoryId ? {...cat, items:cat.items+1} : cat))
        toast.success("Item added");
        setData({
          name: "",
          description: "",
          price:"",
          categoryId:""
        });
        setImage(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to add the item!!");
    }finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
                      width="48"
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    placeholder="Item Name"
                    onChange={onChangeHandler}
                    value={data.name}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                  >
                    <option value="--SELECT CATEGORY--">SELECT CATEGORY</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    name="price"
                    placeholder="&#8377;200.00"
                    onChange={onChangeHandler}
                    value={data.price}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    id="description"
                    className="form-control"
                    name="description"
                    placeholder="Write content here..."
                    onChange={onChangeHandler}
                    value={data.description}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-warning w-100"
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
