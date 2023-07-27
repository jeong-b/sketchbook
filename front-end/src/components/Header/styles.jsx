import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 10px -5px black;

  .logo{
    width:150px;
  }

  .links{
    display: flex;
    margin-right: 20px;
  }

  .active{
    font-weight: bold;
  }

  a{
    margin : auto 20px;
    text-decoration: none;
    font-size: 20px;
    color: #000000;
    }
  }
`

export default Wrapper;