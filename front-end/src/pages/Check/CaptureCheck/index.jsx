import React from 'react';
import Wrapper from "./styles";


export default function CaptureCheck() {
  return (
    <Wrapper>
    <div>
      <h2> 1. 그림 찍기 </h2>
      <iframe
        title="라즈베리파이 캠"
        src="http://192.168.100.246:8080/"
        width="100%"
        height="800px"
      ></iframe>
    </div>
    </Wrapper>
  );
}

