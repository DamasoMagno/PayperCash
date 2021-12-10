import styled from "styled-components";

type NavigationProps = {
  isCurrentPage: boolean;
}

export const Containaer = styled.li<NavigationProps>`
background: ${({ isCurrentPage }) => isCurrentPage && "#eee"};
border-radius: ${({ isCurrentPage }) => isCurrentPage && ".10rem"};
  &.active {
        a {
          color: #333333;
        } 
      }

      a {
        color: #FFF;
        font-size: 1.15rem;
      }
`;