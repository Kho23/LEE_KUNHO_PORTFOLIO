import React, { useEffect, useState } from "react";
import SupportComponent from "./components/SupportComponent";
import { useNavigate } from "react-router-dom";
import { supportGetList } from "../../../api/memberApi";

const SupportPage = () => {
  const navigate = useNavigate();
  const [supportList, setSupportList] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await supportGetList();
        setSupportList(res);
      } catch (err) {
        console.error("목록 조회 실패", err);
        alert("목록 조회 중 오류가 발생했습니다");
      }
    };
    f();
  }, []);

  const supportPageHandler = () => {
    navigate(`/member/support/write`);
  };

  const detailPageHandler = (id) => {
    navigate(`/member/support/detail/${id}`);
  };

  return (
    <div>
      <SupportComponent
        supportPageHandler={supportPageHandler}
        supportList={supportList}
        detailPageHandler={detailPageHandler}
      />
    </div>
  );
};

export default SupportPage;
