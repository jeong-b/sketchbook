import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Wrapper from "./styles";

export default function Login() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState(""); // 이메일 인증
  const [warning, setWarning] = useState(""); //유효성 검사
  const [passwordwarning, setPasswordWarning] = useState(""); //패스워드유효성검사
  const [confirmPasswordWarning, setConfirmPasswordWarning] = useState(""); //패스워드일치검사
  const [showPassword, setShowPassword] = useState(false); //패스워드 보여줘?
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //패스워드 확인 보여줘?

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[a-zA-Z0-9!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]{8,20}$/;

  const emailCheck = (username) => {
    const isValidEmail = emailRegEx.test(username);
    if (!isValidEmail) {
      setWarning('이메일 형식을 확인해주세요.');
    } else {
      setWarning('');
    }
    return isValidEmail;
  };

  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      setPasswordWarning('비밀번호 형식이 일치하지 않습니다.');
    } else {
      setPasswordWarning('');
    }
  };

  const confirmPasswordCheck = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordWarning('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordWarning('');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleDuplicateCheck = () => {
    // 이메일 중복확인 로직
    // setEmailDuplicate(true); // 중복된 이메일인 경우
    // setEmailDuplicate(false); // 중복되지 않은 이메일인 경우
  };

  const handleVerifyCode = () => {
    // 인증 코드를 확인 로직
    // 예시: 인증 코드가 유효한 경우, setVerified(true)로 상태를 업데이트합니다.
    // 예시: 인증 코드가 유효하지 않은 경우, setError(true)로 상태를 업데이트합니다.
  };

  return (
    <Wrapper>
      <div className="login">
        <div className="login-signup-buttons">
        <Link to="/main/login" style={{ textDecoration: "none", color: "gray" }}>
            <h3>로그인</h3>
          </Link>
          <Link to="/main/signup" style={{ textDecoration: "none", color: "gray" }}>
            <h3 className='activated'>회원가입</h3>
          </Link>
        </div>

        <form>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <InputGroup style={{ height: '45px', flex: '1', marginRight: '5px' }}>
              <Form.Control
                placeholder="이메일"
                aria-label="useremail"
                style={{ backgroundColor: "#E6E6E6" }}
                onChange={(e) => {
                  setUseremail(e.target.value);
                  emailCheck(e.target.value);
                }}
              />
            </InputGroup>
            <button onClick={handleDuplicateCheck} className='duplicatecheck'>중복확인</button>
          </div>

          <span className='warningmsg'>{warning}</span>

          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <InputGroup style={{ height: '45px', flex: '1', marginRight: '5px' }}>
              <Form.Control
                placeholder="인증 코드 입력"
                aria-label="verificationCode"
                style={{ backgroundColor: "#E6E6E6" }}
                value={verificationCode}
                onChange={handleVerificationCodeChange}
              />
            </InputGroup>
            <button onClick={handleVerifyCode} className='duplicatecheck' style={{width: '67.34px'}}>인증</button>
          </div>

          <div>
            <InputGroup style={{ height: '45px' , marginBottom: '10px' }}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                aria-label="password"
                style={{ backgroundColor: "#E6E6E6" }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordCheck(e.target.value);
                }}
              />
              <InputGroup.Text
                onClick={handleShowPassword}
                style={{ cursor: 'pointer' }}
              >
                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </InputGroup.Text>
            </InputGroup>
            <span className='warningmsg'>{passwordwarning}</span>
          </div>

          <div>
            <InputGroup style={{ height: '45px' }}>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호 확인"
                aria-label="confirmPassword"
                style={{ backgroundColor: "#E6E6E6" }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  confirmPasswordCheck(e.target.value);
                }}
              />
              <InputGroup.Text
                onClick={handleShowConfirmPassword}
                style={{ cursor: 'pointer' }}
              >
                <i className={showConfirmPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </InputGroup.Text>
            </InputGroup>
            <span className='warningmsg'>{confirmPasswordWarning}</span>
          </div>

          <button type="submit" className='start'>시작하기</button>

          <p className="forgot-password"> <a href="/forgot-password">비밀번호 찾기</a></p>
        </form>
      </div>
    </Wrapper>
  );
}
