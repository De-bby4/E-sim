
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Plans from "./pages/Plans";  
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/Admindashoard";
import MyEsims from "./pages/MyEsims";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-esims" element={<MyEsims />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/onboarding" element={<Onboarding/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
