import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PartnerMyComponent from "./components/PartnerMyComponent";
import { getOne } from "../../../api/memberApi";
import { useSelector } from "react-redux";
import useCustomMove from "../../../hooks/useCustomMove";
import { getCookie } from "../../../util/cookieUtil";

const PartnerMyPage = () => {
  const [data, setData] = useState({});
  const { memberId, isLoggedIn } = useSelector((state) => state.auth);
  const { moveToLogin } = useCustomMove();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("비정상적인 접근입니다. 먼저 로그인 해주세요.");
      moveToLogin();
      return;
    }
  }, []);

  useEffect(() => {
    var member = getCookie("member");
    if (isLoggedIn && member.loginId) {
      const f = async () => {
        try {
          const data = await getOne();
          setData(data);
        } catch (err) {
          console.error(err);
        }
      };
      f();
    }
  }, [isLoggedIn, memberId]);

  return <PartnerMyComponent data={data} />;
};

export default PartnerMyPage;
