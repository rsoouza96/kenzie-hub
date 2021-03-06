import styled from "styled-components";

export const Container = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-items: center;
  form div {
    width: 280px;
  }
  .buttonStyled {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .buttonStyled button {
    margin-top: 30px;
    margin-bottom: 20px;
    width: 155px;
    font-size: 1rem;
    color: #fff;
    background-color: #1480fb;
    border: 2px solid #146dd3;
    height: 35px;
  }
  .password button {
    margin-left: 70%;
  }
`;