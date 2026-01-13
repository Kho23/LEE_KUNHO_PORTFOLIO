import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneNotice } from "../../../../api/noticeApi";
import { modifyNotice } from "../../../../api/adminApi";
import { fileRegister } from "../../../../api/fileApi";
import "../../../../styles/ckeditor-custom.css";
import NoticeEditComponent from "./Components/NoticeEditComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

// 공지 상세 및 수정 화면에서 사용할 기본 초기값
const initstate = {
  noticeId: 0,
  content: "",
  createAt: "",
  title: "",
  fileList: [],
};

const NoticeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticeFileRef = useRef();
  // 기존 공지 데이터 전체를 관리하는 상태
  const [getOne, setGetOne] = useState(initstate);
  // 서버에서 받아온 기존 첨부파일 목록
  const [fileList, setFileList] = useState([]);
  // 새로 추가된 첨부파일 목록
  const [newfileList, setNewFileList] = useState([]);
  // 삭제 대상으로 지정된 기존 파일 ID 목록
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  // 알림/확인 모달 상태 관리
  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  // 공지 ID 변경 시 해당 공지 상세 정보를 조회
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOneNotice(id);
        console.log("백엔드에서 가져온 데이터", res);
        // 공지 기본 정보 세팅
        setGetOne(res);
        // 기존 첨부파일 목록 세팅
        setFileList(res.fileList);
      } catch (error) {
        console.error("가져오기실패", error);
      }
    };
    f();
  }, [id]);

  // 제목, 내용 수정 시 공지 데이터 상태 업데이트
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGetOne({ ...getOne, [name]: value });
  };

  // 새 파일 선택 시 기존 새 파일 목록에 추가
  const fileChangeHandler = (e) => {
    const files = [...e.target.files];
    setNewFileList((prev) => [...prev, ...files]);
  };

  // 공지 수정 제출 처리 함수
  const submitHandler = (e) => {
    e.preventDefault();

    const f = async () => {
      try {
        let newFiles = [];

        // 새로 추가된 파일이 있을 경우 업로드 처리
        if (newfileList.length > 0) {
          const formData = new FormData();
          newfileList.forEach((file) => formData.append("file", file));

          const fileRes = await fileRegister(formData, "notice");

          // 업로드 결과를 공지 수정용 파일 데이터 형식으로 변환
          newFiles = fileRes.fileData.map((fileData, idx) => ({
            originalName: newfileList[idx].name,
            savedName: fileData.imageUrl.substring(
              fileData.imageUrl.lastIndexOf("/") + 1
            ),
            filePath: fileData.imageUrl,
            thumbnailPath: fileData.thumbnailUrl,
          }));
        }

        // 기존 파일과 새 파일을 합친 최종 파일 목록
        const finalFileList = [...fileList, ...newFiles];

        // 최종 수정 요청에 사용할 공지 데이터 구성
        const finalNoticeData = {
          ...getOne,
          fileList: finalFileList,
          removeFileId: deletedFileIds,
        };

        // 공지 수정 API 호출
        await modifyNotice(finalNoticeData);
      } catch (error) {
        // 수정 중 오류 발생 시 로그 출력
        console.error("수정 실패:", error);
      }
    };
    f();
  };

  // 기존 첨부파일 삭제 처리
  const deleteFileHandler = (id) => {
    // 화면에서 해당 파일 제거
    const data = fileList.filter((i) => i.id !== id);
    setFileList(data);
    // 삭제 대상 파일 ID를 별도로 관리
    setDeletedFileIds((prev) => [...prev, id]);
  };

  // 새로 추가한 파일 삭제 처리
  const deleteNewFileHandler = (idx) => {
    setNewFileList((i) => i.filter((_, j) => j !== idx));
  };

  // 수정 버튼 클릭 시 확인 모달 표시
  const submitClickHandler = () => {
    setModal({
      open: true,
      type: "confirm",
      message: "공지를 수정하시겠습니까?",
      onConfirm: (result) => {
        if (result === "ok") {
          submitHandler();
        }
        setModal({ ...modal, open: false });
      },
    });
  };

  // 취소 버튼 클릭 시 확인 모달 표시
  const cancelClickHandler = () => {
    setModal({
      open: true,
      type: "confirm",
      message: "공지 수정을 취소하시겠습니까?",
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
      <NoticeEditComponent
        getOne={getOne}
        changeHandler={changeHandler}
        setGetOne={setGetOne}
        fileList={fileList}
        newfileList={newfileList}
        noticeFileRef={noticeFileRef}
        fileChangeHandler={fileChangeHandler}
        deleteFileHandler={deleteFileHandler}
        deleteNewFileHandler={deleteNewFileHandler}
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

export default NoticeEditPage;
