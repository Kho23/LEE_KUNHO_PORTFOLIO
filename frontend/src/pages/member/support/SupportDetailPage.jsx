import { useEffect, useState } from "react";
import SupportDetailComponent from "./components/SupportDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { supportGetOne } from "../../../api/memberApi";

const SupportDetailPage = () => {
  const { no } = useParams();
  const [supportList, setSupportList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const f = async () => {
      try {
        const getOne = await supportGetOne(no);
        setSupportList(getOne);
      } catch (err) {
        console.error("목록 조회 실패", err);
        alert("목록 조회 중 오류가 발생했습니다");
      }
    };
    f();
  }, []);

  const toListHandler = () => {
    navigate(`/member/support`);
  };

  return (
    <SupportDetailComponent
      supportList={supportList}
      toListHandler={toListHandler}
    />
  );
};

export default SupportDetailPage;
