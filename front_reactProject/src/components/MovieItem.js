import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MovieItemBlock = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.1rem;
    margin: 0;
    text-align: center;
  }

  p {
    margin: 0.5rem 0 0;
    font-weight: bold;
    color: #e74c3c;
  }

  .year {
    font-size: 0.8rem;
  }
  b {
    color: black;
  }
`;

const MovieItem = ({ movie }) => {
  const navigate = useNavigate();
  const { title, poster_path, vote_average, release_date, id } = movie;
  const releaseDate = release_date
    ? release_date.slice(0, 10)
    : "개봉년도 없음";
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : null;

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <MovieItemBlock onClick={handleClick}>
      {posterUrl ? (
        <img src={posterUrl} alt={title} />
      ) : (
        <div style={{ width: "200px", height: "300px", background: "#ccc" }}>
          이미지 없음
        </div>
      )}
      <h2>{title}</h2>
      <p>
        <b>⭐평점: </b> {vote_average}
      </p>
      <div className="year">📅 {releaseDate}</div>
    </MovieItemBlock>
  );
};

export default MovieItem;
