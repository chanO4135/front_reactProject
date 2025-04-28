import React, { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "./ReviewPage.scss";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const reviewsPerPage = 5; // 한 페이지에 표시할 리뷰 개수

  // 리뷰 추가 함수
  const addReview = (review) => {
    setReviews([{ id: Date.now(), ...review }, ...reviews]);
  };

  // 리뷰 수정 함수
  const updateReview = (id, updatedText, updatedRating) => {
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? { ...review, text: updatedText, rating: updatedRating }
          : review
      )
    );
  };

  // 리뷰 삭제 함수
  const deleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  // 현재 페이지에 해당하는 리뷰 목록 가져오기
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 변경 처리 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 페이지네이션 버튼 만들기
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="review-page">
      <div className="review-container">
        <h1 className="title">🎬 영화 리뷰 게시판</h1>
        <ReviewForm onAdd={addReview} />
        <ReviewList
          reviews={currentReviews} // 현재 페이지에 해당하는 리뷰만 전달
          onUpdate={updateReview}
          onDelete={deleteReview}
        />

        {/* 페이지네이션 버튼 */}
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
