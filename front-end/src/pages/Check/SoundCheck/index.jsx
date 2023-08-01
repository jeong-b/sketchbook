import React, { useState, useEffect } from "react";
import SoundWrapper from "./styles";

const SoundCheck = () => {
  const [audioStream, setAudioStream] = useState(null);
  const [volume, setVolume] = useState(0);

  const handleMicrophone = () => {
    console.log(audioStream);
    if (audioStream) {
      setAudioStream(null);
      setVolume(0);
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
        <img
          className="volume"
          src={process.env.PUBLIC_URL + "/assets/volume.png"}
        />
        <div className="sound">
          <img src={process.env.PUBLIC_URL + "/assets/sound.png"} alt="" />
          <div
            className="gauge"
            style={{
              width: `${volume}px`,
            }}
          />
        <div className="button">
          <button onClick={handleMicrophone}>
            {audioStream ? "끄기" : "켜기"}
          </button>
        </div>
        </div>
      </div>
      <h4>
        "출발"이라고 외쳐 보세요!
      </h4>
    </SoundWrapper>
  );
};

export default SoundCheck;
