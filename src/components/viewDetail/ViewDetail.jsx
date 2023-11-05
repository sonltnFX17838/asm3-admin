import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
// import openSocket from "socket.io-client";
import formatCurrentcy from "../../utils/formatCurrent";
import sessionAdmin from "../../utils/sessionAdmin";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const ViewDetail = () => {
  const { idDetail } = useParams();
  const [detail, setDetail] = useState(false);
  const session = sessionAdmin();
  const host = import.meta.env.VITE_REACT_API_URL;

  useEffect(() => {
    axios
      .get(`${host}admin-page/view-detail/${idDetail}`, {
        headers: {
          Authorization: session.session,
        },
      })
      .then((response) => setDetail(response.data.detail))
      .catch((err) => console.log(err));

    // openSocket("http://localhost:5000");
  }, [idDetail]);

  return (
    <div className="mx-5">
      {detail && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "26px 0",
          }}
        >
          <Typography variant="h4">INFORMATION ORDER</Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>ID User:</span>
            {detail.user._id}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>Full Name:</span>{" "}
            {detail.user.fullName}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>Phone:</span>{" "}
            {detail.user.phoneNumber}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>Address:</span> {detail.address}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>Total:</span>{" "}
            {formatCurrentcy(detail.cart.totalPrice)}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>Delivery:</span>{" "}
            {detail.isCompleted ? "completed" : "ordering"}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "600" }}>Transaction Status:</span>{" "}
            {detail.transactionStatus ? "finish" : "unfinished"}
          </Typography>
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>ID PRODUCT</TableCell>
            <TableCell sx={{ textAlign: "center" }}>IMAGE</TableCell>
            <TableCell sx={{ textAlign: "center" }}>NAME</TableCell>
            <TableCell sx={{ textAlign: "center" }}>PRICE</TableCell>
            <TableCell sx={{ textAlign: "center" }}>COUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail &&
            detail.cart.items.map((product, index) => (
              <TableRow className="text-center" key={index}>
                <TableCell className="w-25 align-middle">
                  {detail._id}
                </TableCell>
                <TableCell className="align-middle">
                  <img
                    src={product.product.img1}
                    style={{ width: "160px" }}
                    alt="..."
                  />
                </TableCell>
                <TableCell className="align-middle fs-5">
                  {product.product.name}
                </TableCell>
                <TableCell className="align-middle fs-5">
                  {formatCurrentcy(product.product.price)}
                </TableCell>
                <TableCell className="align-middle fs-5">
                  {product.quantity}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewDetail;
