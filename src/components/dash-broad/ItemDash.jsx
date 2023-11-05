import { TableRow, TableCell } from "@mui/material";
import formatCurrency from "../../utils/formatCurrent";
import { useState } from "react";
import axios from "axios";
import sessionAdmin from "../../utils/sessionAdmin";
import StatusSelect from "./StatusSelect";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const ItemDashboard = ({ trans }) => {
  const [transaction, setTransaction] = useState(trans);
  const session = sessionAdmin();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_REACT_API_URL;
  const handleChangeStatus = (stt) => {
    axios
      .post(
        `${host}admin-page/change-status-order`,
        { idOrder: transaction._id, status: stt },
        {
          headers: {
            Authorization: session.session,
          },
        }
      )
      .then((response) => {
        if (response.data.order) {
          setTransaction(response.data.order);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <TableRow>
      <TableCell>{transaction.user._id}</TableCell>
      <TableCell>{transaction.user.fullName}</TableCell>
      <TableCell>{transaction.user.phoneNumber}</TableCell>
      <TableCell>{transaction.address}</TableCell>
      <TableCell>{formatCurrency(transaction.cart.totalPrice)}</TableCell>
      <TableCell>
        {transaction.isCompleted ? "completed" : "ordering"}
      </TableCell>
      <TableCell>
        <StatusSelect
          status={transaction.transactionStatus}
          onChangeStatus={handleChangeStatus}
        />
      </TableCell>
      <TableCell>
        <button
          className="text-white bg-green-500 p-2 "
          onClick={() => navigate(`/admin/detail/${transaction._id}`)}
        >
          View
        </button>
      </TableCell>
    </TableRow>
  );
};

export default ItemDashboard;
