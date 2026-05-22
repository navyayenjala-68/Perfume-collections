import { Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PerfumeDetails from "./pages/PerfumeDetails";
import Profile from "./pages/Profile";
import Recommendation from "./pages/Recommendation";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/perfume/:id" element={<PerfumeDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/recommendation" element={<Recommendation />} />
    </Routes>
  );
}

export default App;
