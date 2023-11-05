import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DifferenceOutlinedIcon from "@mui/icons-material/DifferenceOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ItemDashboard from "./ItemDash";
import formatCurrency from "../../utils/formatCurrent";

const Dashbroad = () => {
  const host = import.meta.env.VITE_REACT_API_URL;
  const [dashboard, setDashboard] = useState([]);
  useEffect(() => {
    const sessionAdmin = JSON.parse(localStorage.getItem("sessionAdmin"));
    axios
      .get(`${host}admin-page/history`, {
        headers: {
          Authorization: sessionAdmin.session,
        },
      })
      .then((response) => setDashboard(response.data.dashboard))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col gap-8 p-10  items-center">
      <div className="flex w-full bg-white">
        <div className="flex justify-between items-center border w-1/3 py-8 px-4">
          <div>
            <h1>{dashboard?.users}</h1>
            <p>client</p>
          </div>
          <div>
            <PersonAddAltOutlinedIcon />
          </div>
        </div>
        <div className="flex justify-between items-center border w-1/3 py-8 px-4">
          <div>
            <h1>{formatCurrency(dashboard.earningOfMonth)}</h1>
            <p>Earnings of month</p>
          </div>
          <div>
            <AttachMoneyOutlinedIcon />
          </div>
        </div>
        <div className="flex justify-between items-center border w-1/3 py-8 px-4">
          <div>
            <h1>{dashboard?.newOrder}</h1>
            <p>News Order</p>
          </div>
          <div>
            <DifferenceOutlinedIcon />
          </div>
        </div>
      </div>
      <div className=" w-full bg-white p-4">
        <Typography variant="h5">History</Typography>
        <div className=" w-full">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID User</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboard.history &&
                dashboard.history.map((trans, index) => (
                  <ItemDashboard trans={trans} key={index} />
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashbroad;
