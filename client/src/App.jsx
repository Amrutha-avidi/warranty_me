import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<IgnoreQueryParams component={Home} />} />
      </Routes>
    </Router>
  );
}

// Helper to remove query params (prevents 404)
const IgnoreQueryParams = ({ component: Component }) => {
  const location = useLocation();
  const pathname = location.pathname; // Only keep "/home"
  
  if (pathname.startsWith("/home")) {
    return <Component />;
  }
  
  return null;
};

export default App;
