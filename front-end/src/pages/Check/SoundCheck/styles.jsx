import styled from "styled-components";

export const SoundWrapper = styled.div`
padding : 30px;

.box{
    padding : 60px;
    box-shadow: 1px 2px 10px grey;
    border : none;
}

.sound{
    padding : 20px;
    width : 100%;
    display: flex;
    flex-direction: column;
}

.sound img { 
    width: 100%;
    height: 100%;
    z-index: 2;
}

.gauge{
    max-width: 90%;
    height: 48%;
    background-color: black;
    position: absolute;
    z-index: 1;
}

.volume {
    width : 30%;
    object-fit: contain;
    z-index: 2;
}

button{
    border : none;
    border-radius : 10px;
    font-weight : bold;
    padding : 20px;
    background-color : #D3B2FF;
}

h4{
    font-weight : bold;
    margin : 20px;
}
`;

export default SoundWrapper;
