import { TextField, TextareaAutosize, Typography } from "@mui/material";
import axios from "axios";

import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  category: "",
  short_desc: "",
  long_desc: "",
  price: "",
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ALL":
      return { ...action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_LONG_DESC":
      return { ...state, long_desc: action.payload };
    case "SET_SHORT_DESC":
      return { ...state, short_desc: action.payload };
    case "SET_PRICE":
      return { ...state, price: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const EditProduct = () => {
  const host = import.meta.env.VITE_REACT_API_URL;
  const { productId } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));

    axios
      .get(`${host}admin-page/product/${productId}`, {
        headers: {
          Authorization: sessionAdmin.session,
        },
      })
      .then((response) => {
        if (response.data) {
          dispatch({ type: "SET_ALL", payload: response.data.product });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const submitEditProduct = (e) => {
    e.preventDefault();
    const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
    axios
      .put(
        `${host}admin-page/edit-product/${productId}`,
        {
          product: state,
        },
        {
          headers: {
            Authorization: sessionAdmin.session,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "RESET" });
          navigate("/admin/products");
        }
      });
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center">
      <form
        className="flex flex-col w-2/4 my-16 gap-6"
        encType="multipart/form-data"
        onSubmit={submitEditProduct}
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
            value={state.category}
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
            className="bg-white rounded p-2"
            value={state.price}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE", payload: parseInt(e.target.value) })
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
            value={state.short_desc}
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
            value={state.long_desc}
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
            className="bg-white rounded p-2"
            value={state.total}
            onChange={(e) =>
              dispatch({ type: "TOTAL", payload: parseInt(e.target.value) })
            }
          />
        </div>

        <button className="text-white bg-violet-500 rounded-none p-2  w-20">
          Submit
        </button>
      </form>
    </div>
  );
};
export default EditProduct;
