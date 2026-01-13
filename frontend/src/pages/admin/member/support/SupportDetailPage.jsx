import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supportGetOne } from "../../../../api/memberApi";
import { registerSupportResponse } from "../../../../api/adminApi";
import SupportDetailComponent from "./components/SupportDetailComponent";

const SupportDetailPage = () => {
  const { no } = useParams();

  // 문의 상세 정보 상태
  const [data, setData] = useState({});
  // 관리자 답변 입력 상태
  const [response, setResponse] = useState({ content: "" });

  // 문의 상세 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await supportGetOne(no);
        setData(res);
      } catch (error) {
        console.error("문의 상세 조회 실패:", error);
      }
    };
    fetchData();
  }, [no]);

  // 관리자 답변 등록
  const addResponseHandler = () => {
    const f = async () => {
      try {
        const res = await registerSupportResponse(no, response);
        // 기존 문의 데이터에 새로 등록된 답변 추가
        setData((prev) => ({
          ...prev,
          response: [...prev.response, res],
        }));
        setResponse({ content: "" });
      } catch (error) {
        console.error("답변 등록 실패:", error);
      }
    };
    f();
    window.location.reload();
  };

  return (
    <SupportDetailComponent
      data={data}
      response={response}
      setResponse={setResponse}
      addResponseHandler={addResponseHandler}
    />
  );
};

export default SupportDetailPage;
