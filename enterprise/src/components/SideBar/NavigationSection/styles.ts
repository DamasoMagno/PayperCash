import styled from "styled-components";

type NavigationProps = {
  isCurrentPage: boolean;
};

export const Containaer = styled.li<NavigationProps>`
  background: ${({ isCurrentPage }) => isCurrentPage && "#eef5db"};
  border-radius: ${({ isCurrentPage }) => isCurrentPage && ".10rem"};
  list-style: none;
  cursor: pointer;
  padding: 1rem 1rem;
  margin: 0.25rem 0;
  transition: 0.2s background;

  &.active,
  &:hover {
    background: #eee;
    border-radius: 0.1rem;

    a {
      color: var(--secondary-color);
    }
  }

  a {
    color: #fff;
    font-size: 1.15rem;
    font-weight: 600;
  }
`;
