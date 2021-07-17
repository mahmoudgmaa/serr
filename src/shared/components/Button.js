import styled from "styled-components";
export const Button = styled.button`
  background: ${({ disabled }) => (disabled ? "#d3d3d3" : "#e65252")};
  color: #fff;
  font-weight: 50;
  font-size: 2rem;
  border-radius: 1rem;
  border: 1px solid ${({ disabled }) => (disabled ? "#d3d3d3" : "#e65252")};
  transition: 0.2s ease-in-out;
  /* margin-left: 5px; */
  margin: 1.5rem;
  padding: 6px 16px;
  &:hover {
    color: black;
    background: ${({ disabled }) => (disabled ? "#d3d3d3" : "#fff")};
    transition: 0.2s ease-in-out;
  }
`;
