import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Auth/Homepage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
