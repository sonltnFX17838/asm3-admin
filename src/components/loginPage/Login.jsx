import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import sessionUser from "../../utils/sessionAdmin";

const Login = () => {
  const session = sessionUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInHandle = (e) => {
    e.preventDefault();
    axios
      .post("https://asm3-node.onrender.com/admin-page/sign-in", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.session) {
          if (
            response.data.role.includes("Admin") ||
            response.data.role.includes("Counselors")
          ) {
            const session = {
              session: response.data.session,
              user: response.data.user,
              role: response.data.role,
            };
            localStorage.setItem("sessionAdmin", JSON.stringify(session));
            if (session.role === "Admin") {
              return navigate("/admin/home");
            }
            if (session.role === "Counselors") {
              return navigate("/chat");
            }
          } else {
            alert("email or password is wrong");
          }
        } else {
          alert("something wrong");
        }
      })
      .catch((err) => console.log(err));
  };
  if (session && session.role === "Admin") {
    return <Navigate to="/admin/home" />;
  }
  if (session && session.role === "Counselors") {
    return <Navigate to="/chat" />;
  }

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      <div className="w-1/3 ">
        <h2 className="text-3xl font-bold my-4">Login</h2>
        <form className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="p-2 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="text-white rounded p-2 w-20 bg-sky-400"
            onClick={signInHandle}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
