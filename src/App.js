import "./App.css";
import StudentHome1 from "./studentHome";
import Create from "./create";
import { Link } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentHome1 />}></Route>
          <Route path="/create" element={<Create />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;