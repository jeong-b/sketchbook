import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Wrapper from "./styles";
import { useNavigate } from "react-router";
import isConnected from "../../utils/isConnected";
import { useState } from "react";

function Guide() {
  //   console.log(`
  // ╭ ◜◝ ͡ ◜◝ ͡ ◜◝ ͡ ◜◝ ͡ ◜◝ ͡ ◜◝ ͡ ◜◝ ͡ ◜◝ ͡ ◜◝╮
  //             콘솔창 그만 보시옵소서
  // ╰ ◟◞ ͜ ◟◞ ͜ ◟◞ ͜ ◟◞ ͜ ◟◞ ͜ ◟◞ ͜ ◟◞ ͜ ◟◞ ͜ ◟◞ ╯
  // O °
  // ᕱ ᕱ
  // ( ･ω･)
  // / つΦ . .. . ﹢ ⃰ ଂ ಇ
  // `)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const connection = isConnected();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToConnect = () => {
    if (connection == 'true') {
      openModal();
    } else {
      navigate("/connect");
    }
  };

  const goToBooks = () => {
    navigate("/books");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <div className="box">
          <h2>
            스케치북, <span>어떻게</span> 이용하나요?
            <img src={process.env.PUBLIC_URL + "/assets/emoji.png"} alt="" />
          </h2>
          <ol>
            <li>
              기기 연결을 해주세요. 기기 연결을 아직 하지 않았다면, 아래 버튼을
              눌러주세요.
            </li>
            <li>책장에서 모험을 떠나고 싶은 동화를 선택해주세요.</li>
            <li>주인공을 따라 그림을 등록하고, 환경 설정을 해주세요.</li>
            <li>시작 가이드에 따라 그림을 등록하고, 환경 설정 해주세요.</li>
            <li>
              만약 기존 기기를 해제하고, 타 기기로 연결하고 싶다면 로그아웃
              해주세요.
            </li>
          </ol>
          <div className="btndiv">
            <button type="button" onClick={goToConnect}>
              기기 연결하기
            </button>
          </div>
        </div>
      </Wrapper>
      <Modal closeModal={closeModal} isModalOpen={isModalOpen} message={"기기가 이미 연결되어 있어요."} clickResult={goToBooks}></Modal>
    </>
  );
}

export default Guide;
