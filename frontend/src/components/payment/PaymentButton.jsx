import React, { useEffect, useState } from "react";
import { getOne } from "../../api/memberApi";
import axios from "axios";
// 인터셉터가 있으므로 axios만 import하면 됩니다. (별도 설정 X)
const PaymentButton = ({ info }) => {
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    getOne() //로그인 유저 정보 확인 
      .then((data) => setBuyer(data)) // 로그인 유저를 구매자로 설정
      .catch(console.error);
  }, []);

  const handlePayment = () => {
    console.log("전달받은 결제 정보:", info);
    console.log("결제 금액:", info.price);
    if (!window.IMP) return alert("결제 모듈 로딩 중...");
    if (!buyer) return alert("회원 정보 로딩 중...");

    const { IMP } = window;
    IMP.init("imp04278342"); // 포트원 스토어 식별코드 입력

    // 2. 결제 요청
    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        name: info.title, // props로 받은 제품명
        amount: info.price, // props로 받은 가격
        buyer_email: buyer.memberEmail || buyer.email, //구매자 이메일
        buyer_name: buyer.memberName, // 구매자 이름
        buyer_tel: buyer.memberPhoneNumber || buyer.phoneNumber, //구매자 전화번호
      },
      async (rsp) => {
        if (rsp.success) {
          // 3. 백엔드 검증 요청 (헤더 설정 삭제함 -> 인터셉터가 처리)
          const requestData = {
            name: info.name,
            phoneNumber: info.phoneNumber,
            memo: info.meno,
            paymentId: rsp.imp_uid,
            productType: info.productType,
            targetId: info.lessonId, // props로 받은 ID
            price: rsp.paid_amount,
            startTime: info.startTime,
            endTime: info.endTime,
            date: info.date,
          };

          try {
            await axios.post("/api/payment/complete", requestData); //백엔드 결제 담당 컨트롤러로 결제 검증 요청 전송
            alert("수강신청 완료!");
            window.location.reload();
          } catch (error) {
            const msg = error.response?.data || "서버 응답 없음";
            alert(`결제 검증 실패: ${msg}`); //검증 중 에러 발생 시 메세지 표시
          }
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <>
      {info.productType == "LESSON" ? (
        <button
          onClick={handlePayment}
          disabled={!buyer}
          className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition h-[48px]"
        >
          {buyer ? `${info.price?.toLocaleString()}원 결제하기` : "로딩 중..."}
        </button>
      ) : (
        <button
          onClick={handlePayment}
          disabled={!buyer}
          className="w-full mt-4 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition h-[48px]"
        >
          {buyer ? `${info.price?.toLocaleString()}원 결제하기` : "로딩 중..."}
        </button>
      )}
    </>
  );
};

export default PaymentButton;
