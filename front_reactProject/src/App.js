import "./App.css";

import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";

import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviePage />}></Route>
      <Route path="/:category" element={<MoviePage />}></Route>
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
}

export default App;
