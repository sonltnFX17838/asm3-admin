import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ItemProduct from "./ItemProduct";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState(false);
  const [searchText, setSearchText] = useState("");
  const api = import.meta.env.VITE_REACT_API_URL;
  console.log(api);
  const navigate = useNavigate();
  useEffect(() => {
    const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
    if (searchText !== "") {
      axios
        .get(`${api}admin-page/search-product/${searchText}`, {
          headers: {
            Authorization: sessionAdmin.session,
          },
        })
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${api}admin-page/products`, {
          headers: {
            Authorization: sessionAdmin.session,
          },
        })
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) => console.log(err));
    }
  }, [searchText]);

  return (
    <div className=" w-full flex px-4 flex-col bg-white">
      <Typography variant="h4">Product</Typography>
      <div className="flex justify-between my-2">
        <TextField
          placeholder="Enter search"
          size="small"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => navigate("/admin/product/new")}
        >
          Add New
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((prod) => (
                <ItemProduct prod={prod} key={prod._id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
