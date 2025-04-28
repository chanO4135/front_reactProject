import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const categories = [
  {
    name: "all",
    text: "전체영화",
  },
  {
    name: "popular",
    text: "인기영화",
  },
  {
    name: "now_playing",
    text: "현재상영중",
  },
  {
    name: "upcoming",
    text: "개봉예정",
  },
  {
    name: "top_rated",
    text: "높은평점",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 668px;
  margin: 0 auto;
  @media screen and (max-width: 668px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: black;
  padding-bottom: 0.25rem;
  padding: 0.3rem 0.5rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #495057;
  }

  //   기호가 $(달러) 임! 이런식으로style꾸미기에 조건식을 넣어줄수있음
  //   props로 전달받은 onSelect, category중에서 active가 true이면
  //   css를 적용해라

  //&:NavLink를 가리킴

  &.active {
    font-size: 1.25rem;
    font-weight: 800;
    border-bottom: 3px solid hsl(56, 93.7%, 49.6%);
    color: rgb(207, 34, 34);
    &:hover {
      color: rgb(219, 59, 59);
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        // c에담긴것:select됐을때 선택된예) name: 'popular',text: '인기영화',
        <Category
          key={c.name}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={c.name === "all" ? "/" : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
