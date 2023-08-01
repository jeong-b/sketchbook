import styled from "styled-components";

const Wrapper = styled.div`
.video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.65;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-family: 'Pretendard-Regular';
  text-align: center;
}

.text-overlay h1 {
  font-size: 90px;
  color: yellow;
  line-height: 1;
  font-family: 'EF_jejudoldam';
  letter-spacing: -10px;
}


.introduce{
  line-height: 0.9;
  color: white;
}

.Choose {
  background-color: rgba(255, 255, 255, 0.5); 
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  right: 30%; 
  transform: translate(50%, -50%);
  font-family: 'Pretendard-Regular';
  color: gray;
  width: 400px
}

.connect {
  border-radius: 5px;
  border: none;
  height: 50px;
  width: 120px;
  margin-bottom: 20px;
}



`

export default Wrapper;