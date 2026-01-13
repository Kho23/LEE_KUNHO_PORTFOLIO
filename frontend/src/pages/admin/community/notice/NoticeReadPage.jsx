import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneNotice } from "../../../../api/noticeApi";
import { deleteNotice } from "../../../../api/adminApi";
import NoticeReadComponent from "./Components/NoticeReadComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const initState = {
  content: "",
  createdAt: "",
  noticeId: 0,
  title: "",
  viewCount: 0,
};

const NoticeReadPage = () => {
  const { id } = useParams();
  // 공지 상세 데이터를 관리하는 상태
  const [notice, setNotice] = useState(initState);
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();
  // 알림/확인 모달 상태 관리
  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  // 공지 ID 변경 시 해당 공지 상세 정보 조회
  useEffect(() => {
    const getOne = async () => {
      try {
        const data = await getOneNotice(id);
        console.log(data);
        // 조회된 공지 데이터 상태에 반영
        setNotice(data);
      } catch (error) {
        // 공지 데이터 로드 실패 시 로그 출력
        console.log("백엔드 데이터 로드 중 오류 발생", error);
      }
    };
    getOne();
  }, [id]);

  // 삭제 버튼 클릭 시 공지 삭제 처리
  const deleteHandler = () => {
    // 삭제 여부를 묻는 확인 모달 표시
    setModal({
      open: true,
      type: "confirm",
      message: "공지를 삭제하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          const f = async () => {
            try {
              // 공지 삭제 API 호출
              await deleteNotice(id);
              navigate(-1);
            } catch (error) {
              console.error("삭제 error", error);
            }
          };
          f();
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  return (
    <>
      <NoticeReadComponent
        notice={notice}
        id={id}
        deleteHandler={deleteHandler}
      />

      {modal.open && (
        <ModalComponent
          type={modal.type}
          message={modal.message}
          onConfirm={modal.onConfirm}
        />
      )}
    </>
  );
};

export default NoticeReadPage;
