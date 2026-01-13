import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkCode, sendCode } from '../../../api/authApi'
import FindIdPageComponent from './FindIdPageComponent';

const initState = {
    memberName: "",
    memberEmail: ""
}

const FindIdpage = () => {
    const navigate = useNavigate(); // 결과 화면 버튼 이동을 위해 추가
    const [step, setStep] = useState(1)// 1.정보입력 2.인증번호입력 3.아이디 결과
    const [memberInfo, setMemberInfo] = useState(initState)//입력한 이름, 이메일
    const [foundID, setFoundID] = useState("")//조회된 아이디
    const [authCode, setAuthCode] = useState("")//인증번호
    const [timer, settTimer] = useState(180)//인증번호 입력 타이머(3분)

    useEffect(() => { //타이머 설정
        let timeLeft
        if (step == 2 && timer > 0) { //인증번호 입력단계이며 남은시간이 있다면 
            timeLeft = setInterval(() => {
                settTimer((prev) => prev - 1); //1초씩 감소하게 함
            }, 1000)
        } else if (timer === 0) clearInterval(timeLeft) //타이머가 0초면 인터벌 종료
        return () => {
            clearInterval(timeLeft)
        }
    }, [step, timer])

    const handleChange = (e) => {
        const { name, value } = e.target
        setMemberInfo({ ...memberInfo, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!memberInfo.memberEmail || !memberInfo.memberName) {
            alert("이름과 이메일을 모두 입력해주세요.");
            return;
        }
        try {
            await sendCode(memberInfo)//인증번호 발송
            alert("입력하신 메일로 인증번호가 발송되었습니다. 메일을 확인해주세요.")
            setStep(2)//인증단계로 넘어가기
            settTimer(180)//타이머 3분 설정 (setTimeout -> settTimer로 수정 적용)
        } catch (error) {
            console.log("아이디 찾기 중 에러 발생", error)
            alert("일치하는 회원 정보를 찾을 수 없습니다.") // 사용자 알림 추가
        }
    }
    const formatTime = (sec) => {//남은 시간 계산기
        const minutes = Math.floor(sec / 60);//분 표시
        const seconds = sec % 60;//초 표시
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;//분 초 붙여서 표시 (00으로 초 표시하기 위한 삼항연산)
    };

    const handleVerity = async () => {
        if (!authCode) {
            alert("인증번호를 입력해주세요.")
            return;
        }
        try {
            const data = await checkCode(memberInfo, authCode) 
            setFoundID(data);
            setStep(3)
        } catch (error) {
            console.log("아이디 찾기 중 에러 발생 ", error)
            alert(error.response?.data || "인증번호가 일치하지 않습니다.")
        }
    }
  return (
    <div>
      <FindIdPageComponent 
        step={step}
        setStep={setStep}           // 뒤로가기 버튼 등에 필요
        memberInfo={memberInfo}     // 인풋 값 표시에 필요
        handleChange={handleChange} // 인풋 입력 처리에 필요
        handleSubmit={handleSubmit} // 1단계 폼 제출
        authCode={authCode}         // 2단계 인풋 값
        setAuthCode={setAuthCode}   // 2단계 인풋 입력 처리
        handleVerity={handleVerity} // 2단계 검증 버튼
        timer={timer}               // 타이머 숫자
        formatTime={formatTime}     // 시간 포맷 함수
        foundID={foundID}           // 3단계 결과 아이디
      />
    </div>
  )
}

export default FindIdpage
