import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";
import NoticeAddComponent from "./Components/NoticeAddComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const NoticeAddPage = () => {
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  // 공지 제목, 내용을 관리하는 상태
  const [noticeData, setNoticeData] = useState({ title: "", content: "" });
  // 첨부 파일 목록을 관리하는 상태
  const [fileList, setFileList] = useState([]);
  // 알림/확인 모달 상태 관리
  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  // 제목, 내용 입력 시 noticeData를 업데이트
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNoticeData({ ...noticeData, [name]: value });
  };

  // 파일 선택 시 파일 목록을 상태에 저장
  const fileChangeHandler = (e) => {
    setFileList([...e.target.files]);
  };

  // 공지 등록 처리 함수
  const registerHandler = async () => {
    try {
      let addFiles = [];

      // 첨부 파일이 있을 경우 파일 업로드 처리
      if (fileList.length > 0) {
        const formData = new FormData();
        fileList.forEach((file) => formData.append("file", file));

        const fileRes = await fileRegister(formData, "notice");

        // 업로드된 파일 정보를 공지 등록용 형식으로 변환
        addFiles = fileRes.fileData.map((fileData, idx) => ({
          originalName: fileList[idx].name,
          savedName: fileData.imageUrl.split("/").pop(),
          filePath: fileData.imageUrl,
          thumbnailPath: fileData.thumbnailUrl,
        }));
      }

      // 공지 등록 API 호출
      await registerNotice({
        ...noticeData,
        fileList: addFiles,
      });
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  //추가 버튼 클릭
  const submitClickHandler = () => {
    // 공지 등록 여부를 묻는 확인 모달 표시
    setModal({
      open: true,
      type: "confirm",
      message: "공지를 추가하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          registerHandler();
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  // 취소 버튼 클릭
  const cancelClickHandler = () => {
    // 공지 작성 취소 여부를 묻는 확인 모달 표시
    setModal({
      open: true,
      type: "confirm",
      message: "공지 작성을 취소하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          navigate(-1);
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  return (
    <>
      <NoticeAddComponent
        noticeData={noticeData}
        setNoticeData={setNoticeData}
        changeHandler={changeHandler}
        fileList={fileList}
        noticeFileRef={noticeFileRef}
        fileChangeHandler={fileChangeHandler}
        submitClickHandler={submitClickHandler}
        cancelClickHandler={cancelClickHandler}
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

export default NoticeAddPage;
