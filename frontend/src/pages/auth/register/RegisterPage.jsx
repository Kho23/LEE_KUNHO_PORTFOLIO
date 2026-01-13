import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  duplicateEmail,
  duplicateId,
  sendJoinMail,
  verifyJoinCode,
} from "../../../api/authApi";
import { registerAsync } from "../../../store/auth/authSlice";
import RegisterPageComponent from "./RegisterPageComponent";

const initState = {
  memberLoginId: "",
  memberPassword: "",
  passwordConfirm: "",
  memberName: "",
  memberAddress: "",
  memberDetailAddress: "",
  memberEmail: "",
  memberPhoneNumber: "",
  memberBirthDate: "",
  memberGender: "Male",
};
// 정규식 정의 (아이디, 비밀번호, 이메일 유효성 검사)
const idRegex = /^[a-zA-Z0-9]{7,16}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  // 단계 관리
  const [step, setStep] = useState(1);

  // 회원정보 상태
  const [registerInfo, setRegisterInfo] = useState(initState);

  // 약관 동의 상태
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 🔥 [추가] 중복 확인 상태 (true: 사용 가능 확인됨, false: 미확인)
  const [duplicateCheck, setDuplicateCheck] = useState({
    id: false,
    email: false,
  });

  const [validationErrors, setValidationErrors] = useState({
    // 유효성검사 에러메세지 처리
    memberLoginId: "",
    memberPassword: "",
    passwordConfirm: "",
    memberEmail: "",
  });

  const [emailVerification, setEmailVerification] = useState({
    sent: false,
    verified: false,
    code: "",
  });

  const [detailAddress, setDetailAddress] = useState("");

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (addressData) => {
        setRegisterInfo((prev) => ({
          ...prev,
          memberAddress: addressData.address,
        }));
      },
    }).open();
  };

  const handleSendMail = async () => {
    if (!registerInfo.memberEmail) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(registerInfo.memberEmail)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    try {
      await sendJoinMail(registerInfo.memberEmail);
      alert("인증번호가 발송되었습니다. 메일함을 확인해주세요.");
      setEmailVerification((prev) => ({
        ...prev,
        sent: true,
        verified: false,
      }));
    } catch (error) {
      alert(error.response?.data || "메일 전송에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    if (!emailVerification.code) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    try {
      await verifyJoinCode({
        memberEmail: registerInfo.memberEmail,
        authCode: emailVerification.code,
      });
      alert("이메일 인증이 완료되었습니다.");
      setEmailVerification((prev) => ({ ...prev, verified: true }));
      setDuplicateCheck((prev) => ({ ...prev, email: true }));
    } catch (error) {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  // --- [Step 1] 약관 동의 로직 ---
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    const nextAgreements = { ...agreements, [name]: checked };
    if (
      nextAgreements.terms &&
      nextAgreements.privacy &&
      nextAgreements.marketing
    ) {
      nextAgreements.all = true;
    } else {
      nextAgreements.all = false;
    }
    setAgreements(nextAgreements);
  };

  const handleAllAgreementChange = (e) => {
    const { checked } = e.target;
    setAgreements({
      all: checked,
      terms: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  const handleNextStep = () => {
    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주셔야 회원가입이 가능합니다.");
      return;
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  // --- [Step 2] 정보 입력 및 중복 체크 로직 ---

  // 🔥 [추가] 아이디 중복 확인
  const handleIdCheck = async () => {
    if (!registerInfo.memberLoginId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    try {
      // 백엔드 API 호출 (true: 중복, false: 사용가능 가정)
      const isDuplicate = await duplicateId(registerInfo.memberLoginId);

      if (isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
        setDuplicateCheck((prev) => ({ ...prev, id: false }));
        setRegisterInfo((prev) => ({ ...prev, memberLoginId: "" })); // 입력창 비우기
      } else {
        alert("사용 가능한 아이디입니다.");
        setDuplicateCheck((prev) => ({ ...prev, id: true }));
      }
    } catch (error) {
      console.error(error);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });

    if (name === "memberLoginId") {
      setDuplicateCheck((prev) => ({ ...prev, id: false }));
    }
    if (name === "memberEmail") {
      setDuplicateCheck((prev) => ({ ...prev, email: false }));
    }
    let errorMsg = "";
    if (name == "memberLoginId") {
      if (!idRegex.test(value)) {
        errorMsg = "아이디는 영문, 숫자 포함 7~16자여야 합니다.";
      }
    } else if (name == "memberPassword") {
      if (!passwordRegex.test(value)) {
        errorMsg = "비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.";
      }
    } else if (name == "passwordConfirm") {
      if (value != registerInfo.memberPassword) {
        errorMsg = "비밀번호가 일치하지 않습니다.";
      }
    } else if (name == "memberEmail") {
      if (!emailRegex.test(value)) {
        errorMsg = "이메일이 올바른 형식이 아닙니다.";
      }
    }
    setValidationErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 🔥 [추가] 중복 확인 여부 검사
    if (!duplicateCheck.id) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (!duplicateCheck.email) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    if (registerInfo.memberPassword !== registerInfo.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailVerification.verified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    try {
      const result = await dispatch(registerAsync(registerInfo));
      if (registerAsync.fulfilled.match(result)) {
        alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다.");
        navigate("/auth/login");
      } else {
        alert(result.payload || "입력 내용을 확인해주세요.");
      }
    } catch (error) {
      console.error("회원가입 에러", error);
      alert("오류가 발생했습니다.");
    }
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div>
      <RegisterPageComponent
        step={step}
        setStep={setStep}
        registerInfo={registerInfo}
        detailAddress={detailAddress}
        agreements={agreements}
        setAgreements={setAgreements}
        duplicateCheck={duplicateCheck}
        validationErrors={validationErrors}
        emailVerification={emailVerification}
        setEmailVerification={setEmailVerification}
        handleChange={handleChange}
        handleIdCheck={handleIdCheck}
        handleSendMail={handleSendMail}
        handleVerifyCode={handleVerifyCode}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        handleNextStep={handleNextStep}
        handleAgreementChange={handleAgreementChange}
        handleAllAgreementChange={handleAllAgreementChange}
        handleAddressSearch={handleAddressSearch}
        today={today}
      />
    </div>
  );
};

export default RegisterPage;
