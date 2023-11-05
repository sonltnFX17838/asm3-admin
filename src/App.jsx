import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Products from "./components/Products/Products";
import NewProduct from "./components/new-product/NewProduct";
import EditProduct from "./components/edit-product/EditProduct";
import Dashbroad from "./components/dash-broad/Dashbroad";
import Login from "./components/loginPage/Login";
import ChatPage from "./components/chat/ChatPage";
import ViewDetail from "./components/viewDetail/ViewDetail";
import AuthRoleAdmin from "./components/auth/AuthRoleAdmin";
import AuthRoleChat from "./components/auth/AuthRoleChat";
import NotFound from "./components/notfound/NotFound";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="admin" element={<AuthRoleAdmin />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:productId" element={<EditProduct />} />
          <Route path="new-product" element={<NewProduct />} />
          <Route path="dash-board" element={<Dashbroad />} />
          <Route path="detail/:idDetail" element={<ViewDetail />} />
        </Route>
        <Route
          path="chat"
          element={
            <AuthRoleChat>
              <ChatPage />
            </AuthRoleChat>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
