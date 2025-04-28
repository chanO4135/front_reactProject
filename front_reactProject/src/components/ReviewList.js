import React, { useState } from "react";
import styled from "styled-components";

const ReviewListContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 0;
`;

const ReviewItemContainer = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  height: auto; /* 텍스트 크기에 맞게 자동으로 크기 조절 */
`;

const ReviewText = styled.span`
  font-size: 1rem; /* 기본 텍스트 크기 */
  margin-bottom: 1rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 최대 4줄까지 보여주기 */
  -webkit-box-orient: vertical;
`;

const StarRating = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #ffc107;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex; /* 버튼을 가로로 배치 */
  gap: 1rem; /* 버튼 간 간격 */
  justify-content: flex-end; /* 버튼들을 오른쪽 정렬 */
`;

const Button = styled.button`
  font-size: 1rem; /* 버튼 크기 조정 */
  padding: 0.5rem 1rem; /* 버튼 크기 조정 */
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

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

const ReviewItem = ({ review, onUpdate, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [editRating, setEditRating] = useState(review.rating);

  const handleUpdate = () => {
    onUpdate(review.id, editText, editRating); // 별점 포함
    setIsEdit(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <ReviewItemContainer>
      {isEdit ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown} // 엔터 키로 저장
            style={{
              flexGrow: 1,
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "1rem",
            }}
          />
          <StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setEditRating(star)}
                style={{
                  cursor: "pointer",
                  color: star <= editRating ? "#ffc107" : "#e4e5e9",
                }}
              >
                ★
              </span>
            ))}
          </StarRating>
          <ButtonContainer>
            <Button className="save" onClick={handleUpdate}>
              저장
            </Button>
            <Button className="cancel" onClick={() => setIsEdit(false)}>
              취소
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          <ReviewText>{review.text}</ReviewText>
          {/* 별점 표시 */}
          <StarRating>
            {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
          </StarRating>
          <ButtonContainer>
            <Button className="edit" onClick={() => setIsEdit(true)}>
              수정
            </Button>
            <Button className="delete" onClick={() => onDelete(review.id)}>
              삭제
            </Button>
          </ButtonContainer>
        </>
      )}
    </ReviewItemContainer>
  );
};

const ReviewList = ({ reviews, onUpdate, onDelete }) => {
  return (
    <ReviewListContainer>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ReviewListContainer>
  );
};

export default ReviewList;
