import { TableRow, TableCell } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrent";
// eslint-disable-next-line react/prop-types
const ItemProduct = ({ prod }) => {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_REACT_API_URL;
  const handleDelete = () => {
    if (confirm("You want to delete this product ?")) {
      const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
      axios
        .delete(`${host}admin-page/delete/${prod._id}`, {
          headers: {
            Authorization: sessionAdmin.session,
          },
        })
        .then((response) => {
          if (response.data.success) {
            navigate("/admin/products");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <TableRow>
      <TableCell>{prod._id}</TableCell>
      <TableCell>{prod.name}</TableCell>
      <TableCell>{formatCurrency(prod.price)}</TableCell>
      <TableCell>
        <img src={prod.img1} className="h-32 w-32" />
      </TableCell>
      <TableCell>{prod.category}</TableCell>
      <TableCell>
        <div className="w-32">
          <button
            className="text-white bg-green-500 p-2 "
            onClick={() => navigate(`/admin/product/${prod._id}`)}
          >
            Update
          </button>
          <button
            className="p-2 bg-red-400 text-white ml-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ItemProduct;
