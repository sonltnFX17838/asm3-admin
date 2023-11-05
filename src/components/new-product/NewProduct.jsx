import { TextField, TextareaAutosize, Typography } from "@mui/material";
import axios from "axios";

import { useReducer } from "react";

const initialState = {
  name: "",
  category: "",
  short_desc: "",
  long_desc: "",
  price: "",
  total: 0,
  images: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ALL":
      return { ...action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_LONG_DESC":
      return { ...state, long_desc: action.payload };
    case "SET_SHORT_DESC":
      return { ...state, short_desc: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_IMAGES":
      return { ...state, images: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const NewProduct = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [image, setImage] = useState(false);
  const host = import.meta.env.VITE_REACT_API_URL;

  const handleAddNew = (e) => {
    e.preventDefault();
    const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("category", state.category);
    formData.append("short_desc", state.short_desc);
    formData.append("long_desc", state.long_desc);
    formData.append("price", state.price);
    formData.append("total", state.total);
    formData.append("images", state.images);
    for (let i = 0; i < state.images.length; i++) {
      formData.append("images", state.images[i]);
    }

    axios
      .post(`${host}admin-page/new-product`, formData, {
        headers: {
          Authorization: sessionAdmin.session,
        },
      })
      .then((response) => {
        console.log(response.data.product);
        // setImage(response.data.product.img1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center">
      <form
        className="flex flex-col w-2/4 my-16 gap-6"
        encType="multipart/form-data"
        onSubmit={handleAddNew}
      >
        <div>
          <Typography>Product Name</Typography>
          <TextField
            size="small"
            placeholder="Enter Product Name"
            fullWidth
            className="bg-white rounded p-2"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
          />
        </div>
        <div>
          <Typography>Category</Typography>
          <TextField
            size="small"
            placeholder="Enter Category"
            fullWidth
            className="bg-white rounded p-2"
            defaultValue={state.category}
            onChange={(e) =>
              dispatch({ type: "SET_CATEGORY", payload: e.target.value })
            }
          />
        </div>
        <div>
          <Typography>Price</Typography>
          <TextField
            size="small"
            placeholder="Enter Category"
            fullWidth
            type="number"
            className="bg-white rounded p-2"
            defaultValue={state.price}
            onChange={(e) =>
              dispatch({
                type: "SET_PRICE",
                payload: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Typography>Short Description</Typography>
          <TextareaAutosize
            minRows={2}
            size="small"
            className="rounded-sm w-full leading-6 p-2"
            placeholder="Enter Short Description"
            defaultValue={state.short_desc}
            onChange={(e) =>
              dispatch({ type: "SET_SHORT_DESC", payload: e.target.value })
            }
          />
        </div>
        <div>
          <Typography>Long Description</Typography>
          <TextareaAutosize
            minRows={6}
            size="small"
            className="rounded-sm w-full leading-6 p-2"
            placeholder="Enter Long Description"
            defaultValue={state.long_desc}
            onChange={(e) =>
              dispatch({ type: "SET_LONG_DESC", payload: e.target.value })
            }
          />
        </div>
        <div>
          <Typography>Total</Typography>
          <TextField
            size="small"
            placeholder="Enter Category"
            fullWidth
            type="number"
            className="bg-white rounded p-2"
            defaultValue={state.total}
            onChange={(e) =>
              dispatch({ type: "SET_TOTAL", payload: parseInt(e.target.value) })
            }
          />
        </div>
        <div>
          <Typography>choose field</Typography>
          <input
            type="file"
            name="images"
            multiple
            onChange={(e) =>
              dispatch({ type: "SET_IMAGES", payload: e.target.files })
            }
          ></input>
        </div>
        <button className="text-white bg-violet-500 rounded-none p-2  w-20">
          Submit
        </button>
      </form>
    </div>
  );
};
export default NewProduct;
