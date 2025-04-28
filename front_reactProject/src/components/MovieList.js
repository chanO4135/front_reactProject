import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import { useNavigate } from "react-router-dom";

const MovieListBlock = styled.div`
  box-sizing: border-box;
  padding: 2rem 1rem;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NoResultMessage = styled.p`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const ConfirmButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 0.75rem 2rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.isActive ? "#007bff" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#007bff")};
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const API_KEY = "83f55fe45cea3e94741935a0d8acc8bd";

const MovieList = ({ category, setCategory }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tempSearch, setTempSearch] = useState("");
  const navigate = useNavigate();

  const shouldFetchMore = useCallback(() => {
    return (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      currentPage < totalPages &&
      category !== "all"
    );
  }, [loading, currentPage, totalPages, category]);

  const handleScroll = useCallback(() => {
    if (shouldFetchMore()) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [shouldFetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setCurrentPage(1); // 🔄 페이징 초기화
  }, [category, searchTerm, selectedGenre]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
        );
        setGenres(res.data.genres);
      } catch (e) {
        console.error("장르 불러오기 실패:", e);
      }
    };
    if (category === "all") {
      fetchGenres();
    }
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchTerm, selectedGenre]);

  useEffect(() => {
    if (category === "all") {
      setSearchTerm("");
    }
    setSearchTerm("");
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const scrollY = window.scrollY;
        let url = "";
        const params = {
          api_key: API_KEY,
          language: "ko-KR",
          page: currentPage,
        };

        if (searchTerm) {
          url = `https://api.themoviedb.org/3/search/movie`;
          params.query = searchTerm;
        } else if (category === "all") {
          url = `https://api.themoviedb.org/3/discover/movie`;
          params.sort_by = "popularity.desc";
          if (selectedGenre) {
            params.with_genres = selectedGenre;
          }
        } else {
          url = `https://api.themoviedb.org/3/movie/${category}`;
        }

        const response = await axios.get(url, { params });

        if (currentPage === 1 || category === "all") {
          setMovies(response.data.results);
        } else {
          setMovies((prev) => [...prev, ...response.data.results]);
        }
        setTotalPages(response.data.total_pages);

        setTimeout(() => {
          window.scrollTo({ top: scrollY, behavior: "auto" });
        }, 100);
      } catch (e) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", e);
      }
      setLoading(false);
    };

    fetchData();
  }, [category, selectedGenre, searchTerm, currentPage]);

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      setTempSearch("");
      if (value === "") {
        setCategory("all");
      }
    },
    [setCategory]
  );

  const handleGoBackToAllMovies = useCallback(() => {
    setCategory("");
    setTimeout(() => {
      setCategory("all");
      navigate("/all", { replace: true });
    }, 0);
  }, [setCategory, navigate]);

  const handlePageChange = useCallback(
    (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );

  const { start, end } = useMemo(() => {
    const start = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const end = Math.min(start + 9, totalPages);
    return { start, end };
  }, [currentPage, totalPages]);

  if (loading && movies.length === 0) {
    return (
      <MovieListBlock>🎥 영화 데이터를 불러오는 중입니다...</MovieListBlock>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <MovieListBlock>
        <NoResultMessage>😢 검색 결과가 없습니다.</NoResultMessage>
        <ConfirmButton onClick={handleGoBackToAllMovies}>확인</ConfirmButton>
      </MovieListBlock>
    );
  }

  return (
    <MovieListBlock>
      {category === "all" && (
        <div style={{ marginBottom: "1rem" }}>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            style={{
              padding: "0.5rem",
              marginBottom: "1rem",
              width: "10%",
              borderRadius: "4px",
            }}
          >
            <option value="">장르 선택</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <br />
          <input
            type="text"
            placeholder="영화 제목을 검색하세요"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(tempSearch);
                e.target.blur();
              }
            }}
            style={{
              padding: "1rem",
              width: "30%",
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
      )}

      <MovieGrid>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </MovieGrid>

      {category === "all" && totalPages > 1 && (
        <Pagination>
          {start > 1 && (
            <PageButton onClick={() => handlePageChange(start - 1)}>
              &lt; 이전
            </PageButton>
          )}
          {[...Array(end - start + 1)].map((_, index) => (
            <PageButton
              key={start + index}
              isActive={start + index === currentPage}
              onClick={() => handlePageChange(start + index)}
            >
              {start + index}
            </PageButton>
          ))}
          {end < totalPages && (
            <PageButton onClick={() => handlePageChange(end + 1)}>
              다음 &gt;
            </PageButton>
          )}
        </Pagination>
      )}
    </MovieListBlock>
  );
};

export default MovieList;
