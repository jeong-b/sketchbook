import React, { useState, useEffect } from "react";
import SoundWrapper from "../styles";

const VoiceBar = () => {
  const [audioStream, setAudioStream] = useState(null);
  const [volume, setVolume] = useState(0);

  const handleMicrophone = () => {
    console.log(audioStream);
    if (audioStream) {
      setAudioStream(null);
    } else {
      async function getMicrophone() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setAudioStream(stream);
        } catch (err) {
          console.error("마이크 연결 오류 : ", err);
        }
      }

      getMicrophone();
    }
  };

  useEffect(() => {
    if (audioStream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(audioStream);
      microphone.connect(analyser);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function updateVolume() {
        analyser.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        setVolume(average);
      }

      let animationFrameId = requestAnimationFrame(function update() {
        updateVolume();
        animationFrameId = requestAnimationFrame(update);
      });

      return () => {
        cancelAnimationFrame(animationFrameId);
        microphone.disconnect();
      };
    }
  }, [audioStream]);

  return (
    <SoundWrapper>
      <h2>4. 음성 인식 확인하기</h2>
      <div className="box">
        <div
          style={{
            width: "200px",
            height: "30px",
            backgroundColor: "lightgray",
          }}
        >
          <div
            style={{
              width: `${volume}px`,
              height: "100%",
              backgroundColor: "blue",
            }}
          />
        </div>
        <button onClick={handleMicrophone}>
          {audioStream ? "마이크 끄기" : "마이크 켜기"}
        </button>
      </div>
    </SoundWrapper>
  );
};

export default VoiceBar;
