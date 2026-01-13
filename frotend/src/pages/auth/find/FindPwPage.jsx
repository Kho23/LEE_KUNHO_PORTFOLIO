import React, { useEffect, useState } from 'react'
import { checkCodePw, resetPassword, sendCodePw } from '../../../api/authApi'
import useCustomMove from '../../../hooks/useCustomMove'
import FindPwPageComponent from './FindPwPageComponent'

const initState = {
  memberName: "",
  memberEmail: "",
  memberLoginId: "",
  authCode: "",
  newPassword: "",
  newPasswordConfirm: ""
}

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

const FindPwPage = () => {
  const [validationErrors, setValidationErrors] = useState("")
  const [step, setStep] = useState(1)
  const [memberInfo, setMemberInfo] = useState(initState)
  const [timer, setTimer] = useState(180)

  const { moveToLogin, moveToFindId, moveToFindPw } = useCustomMove()

  const formatTime = (sec) => {//남은 시간 계산기
    const minutes = Math.floor(sec / 60);//분 표시
    const seconds = sec % 60;//초 표시
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;//분 초 붙여서 표시 (00으로 초 표시하기 위한 삼항연산)
  };
  useEffect(() => {
    let timeLeft;
    if (step === 2 && timer > 0) {
      timeLeft = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer == 0) {
      clearInterval(timeLeft)
    }
    return (() => {
      clearInterval(timeLeft)
    })
  }, [step, timer])

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!memberInfo.memberName || !memberInfo.memberEmail || !memberInfo.memberLoginId) {
      alert("이름, 이메일, 아이디를 모두 입력해주세요.")
      return;
    }
    try {
      const data = await sendCodePw(memberInfo)
      setStep(2)
      setTimer(180)
    } catch (error) {
      alert("메일 발송 중 오류가 발생했습니다. "+error)
      console.log("메일 발송중 에러발생 에러내용: ", error)
    }
  }
  const handleClickCheck = async () => {
    if (!memberInfo.authCode) {
      alert("인증번호를 입력해주세요.")
      return
    }
    try {
      const data = await checkCodePw(memberInfo)
      alert("메일 인증에 성공했습니다.")
      setStep(3)
    } catch (error) {
      alert("인증번호가 일치하지 않습니다.")
      console.log("인증번호 인증 중 오류발생 오류내용: ", error)
    }
  }
  const handleResetPassword = async () => {
    if (!memberInfo.newPassword) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordRegex.test(memberInfo.newPassword)) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }
    if (memberInfo.newPassword !== memberInfo.newPasswordConfirm) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.")
      setMemberInfo({ ...memberInfo, newPassword: "", newPasswordConfirm: "" })
      return;
    }
    try {
      const data = await resetPassword(memberInfo)
      alert("비밀번호가 재설정되었습니다. 다시 로그인해주세요.")
      moveToLogin()
    } catch (error) {
      console.log("비밀번호 재설정중 오류발생 오류내용: ", error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
   if (name === "newPassword") {
      if (value.length > 0 && !passwordRegex.test(value)) {
        setValidationErrors("영문, 숫자, 특수문자 포함 8~16자여야 합니다.");
      } else {
        setValidationErrors(""); // 통과 시 에러 메시지 삭제
      }
    }
    setMemberInfo({ ...memberInfo, [name]: value })
  }
  return (
    <div>
      <FindPwPageComponent
        step={step}
        memberInfo={memberInfo}
        timer={timer}
        setTimer={setTimer}
        formatTime={formatTime}
        handleSendCode={handleSendCode}
        handleClickCheck={handleClickCheck}
        handleResetPassword={handleResetPassword}
        handleChange={handleChange}
        validationErrors={validationErrors}
      />
    </div>
  )
}

export default FindPwPage
