import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  margin : 0 auto;

  .container {
    padding: 100px;
  }

  h1 {
    font-weight: bold;
    color: #a451f7;
  }

  h2 {
    font-weight: bold;
    margin: 50px;
  }

  .box{
    border : 1px solid black;
    display: flex;
    height : 600px;
    border-radius: 10px;
    border : 1px solid black;
    width : 100%;
  }
`;

export default Wrapper;
