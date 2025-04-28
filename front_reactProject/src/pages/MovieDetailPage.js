import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewPage from "./ReviewPage";
import Categories from "../components/Categories";

const DetailBlock = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff; //지워이따
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
`;
const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 7rem;
  flex-wrap: wrap; /* 넘치면 줄바꿈 */
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  box-sizing: border-box;
`;

const CastSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const CastTitle = styled.h3`
  margin: 1rem 2rem;
`;

const CastList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 0 2rem 1rem;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  & > * {
    scroll-snap-align: start;
  }
`;

const CastCard = styled.div`
  width: 120px;
  flex: 0 0 auto;
  text-align: center;
  font-size: 0.9rem;
`;
const CastImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movieKo, setMovieKo] = useState(null);
  const [movieEn, setMovieEn] = useState(null);
  const [cast, setCast] = useState([]);
  const API_KEY = "83f55fe45cea3e94741935a0d8acc8bd";

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // 한글 데이터
        const resKo = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
        );
        setMovieKo(resKo.data);

        // 영어 데이터
        const resEn = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovieEn(resEn.data);

        // 출연진 데이터
        const resCredits = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        setCast(resCredits.data.cast.slice(0, 10)); // 상위 10명만 표시
      } catch (e) {
        console.error("영화 상세 정보 불러오기 실패:", e);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movieKo || !movieEn) {
    return <DetailBlock>🎬 영화 정보를 불러오는 중입니다...</DetailBlock>;
  }

  return (
    <div>
      <Categories />
      <DetailBlock>
        <TopSection>
          <Poster
            src={`https://image.tmdb.org/t/p/w500${movieKo.poster_path}`}
            alt={movieKo.title}
          />
          <Info>
            <h2>{movieKo.title}</h2>
            <p>⭐ 평점: {movieKo.vote_average}</p>
            <p>📅 개봉일: {movieKo.release_date}</p>
            <p>
              📝 <strong>개요 (한국어):</strong>{" "}
              {movieKo.overview || "정보 없음"}
            </p>
            <p>
              📝 <strong>Overview (English):</strong>{" "}
              {movieEn.overview || "No overview available"}
            </p>
            <p>⏱️ 상영시간: {movieKo.runtime}분</p>
            <p>🎭 장르: {movieKo.genres.map((g) => g.name).join(", ")}</p>

            {/* ✅ 출연진을 Info 안에 넣기 */}
            <CastSection>
              <CastTitle>👥 출연진</CastTitle>
              <CastList>
                {cast.map((actor) => (
                  <CastCard key={actor.cast_id || actor.credit_id}>
                    {actor.profile_path ? (
                      <CastImage
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                      />
                    ) : (
                      <CastImage
                        src="https://via.placeholder.com/120x160?text=No+Image"
                        alt="No profile"
                      />
                    )}
                    <div>
                      <strong>{actor.name}</strong>
                    </div>
                    <div style={{ color: "#666" }}>{actor.character}</div>
                  </CastCard>
                ))}
              </CastList>
            </CastSection>
          </Info>
        </TopSection>

        {/* ✅ 리뷰 섹션은 맨 아래 */}
        <ReviewPage movieId={id} />
      </DetailBlock>
    </div>
  );
};

export default MovieDetailPage;
