import React, { useState } from "react";
import styled from "styled-components";

// 스타일
const ReviewItemContainer = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 220px;
  position: relative;
`;

const ReviewText = styled.span`
  flex-grow: 1;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Rating = styled.div`
  margin-bottom: 1rem;
  color: #ffcc00;
  font-size: 1.2rem;
`;

const Button = styled.button`
  padding: 0.3rem 0.7rem;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background 0.3s ease;
  margin-right: 0.5rem;

  &.edit {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }

  &.save {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
    }
  }

  &.cancel {
    background-color: #f0f0f0;
    color: #333;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

// 별점 컴포넌트
const StarRating = ({ rating, setRating, editable }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <Rating>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: editable ? "pointer" : "default",
            color: star <= rating ? "#ffc107" : "#e4e5e9",
          }}
          onClick={() => editable && setRating(star)}
        >
          ★
        </span>
      ))}
    </Rating>
  );
};

// 리뷰 아이템
const ReviewItem = ({ review, onUpdate, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [editRating, setEditRating] = useState(review.rating || 0);

  const handleUpdate = () => {
    onUpdate(review.id, editText, editRating);
    setIsEdit(false);
  };

  return (
    <ReviewItemContainer>
      {isEdit ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "0.5rem",
            }}
          />
          <StarRating
            rating={editRating}
            setRating={setEditRating}
            editable={true}
          />
          <div>
            <Button className="save" onClick={handleUpdate}>
              저장
            </Button>
            <Button className="cancel" onClick={() => setIsEdit(false)}>
              취소
            </Button>
          </div>
        </>
      ) : (
        <>
          <ReviewText>{review.text}</ReviewText>
          <StarRating rating={review.rating} editable={false} />
          <div>
            <Button className="edit" onClick={() => setIsEdit(true)}>
              수정
            </Button>
            <Button className="delete" onClick={() => onDelete(review.id)}>
              삭제
            </Button>
          </div>
        </>
      )}
    </ReviewItemContainer>
  );
};

export default ReviewItem;
