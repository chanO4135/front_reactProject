import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import Categories from "../components/Categories";

const MoviePage = () => {
  const params = useParams();
  const [category, setCategory] = useState(params.category || "all");

  // URL 파라미터가 바뀌면 상태도 바꿔주기
  useEffect(() => {
    console.log("params.category:", params.category); // 확인용
    setCategory(params.category || "all");
  }, [params.category]);

  return (
    <div>
      <Categories />
      <MovieList category={category} setCategory={setCategory} />
    </div>
  );
};

export default MoviePage;
