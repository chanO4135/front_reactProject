import React, { useState } from "react";
import styled from "styled-components";

// 스타일
const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  margin-bottom: 0;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Rating = styled.div`
  font-size: 1.5rem;
  color: #ffcc00;
  display: flex;
  gap: 0.3rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff6b6b; /* 영화 리뷰 게시판 스타일 핑크색 */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #ff8787;
  }
`;

// 별점 컴포넌트
const StarRating = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <Rating>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#ffc107" : "#e4e5e9",
          }}
        >
          ★
        </span>
      ))}
    </Rating>
  );
};

// 폼 컴포넌트
const ReviewForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "" || rating === 0) {
      alert("리뷰 내용과 별점을 모두 입력해주세요!");
      return;
    }

    onAdd({ text, rating });
    setText("");
    setRating(0);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StarRating rating={rating} setRating={setRating} />
      <Input
        type="text"
        placeholder="리뷰를 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="submit">등록</Button>
    </FormContainer>
  );
};

export default ReviewForm;
