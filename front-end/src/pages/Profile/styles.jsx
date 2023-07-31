import styled from "styled-components";

const Wrapper = styled.div`
margin-top: 100px;
display : flex;
justify-content : space-evenly;
font-family: 'Pretendard-Regular';


.grid{
    width : 40%;
}

img{
    width: 100%;
    height: 50%;
}

.box {
    background-color: #F8F8F8;
    border-radius: 10px;
    padding: 50px;
  }

  input{
    padding: 15px;
    background-color: #E6E6E6;
    color: black;
  }

  .btn{
    background-color: #FFEE59;
    padding: 10px 0;
    font-weight : bold ;
  }

  h2{
    font-weight : bold;
  }

  h2 span{
    color: #A451F7;
  }

  .message{
    font-size : 12px;
  }


`

export default Wrapper;