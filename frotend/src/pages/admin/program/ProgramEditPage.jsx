import React, { useEffect, useRef, useState } from "react";
import { getOne } from "../../../api/programApi";
import { programModify } from "../../../api/adminApi";
import { useParams } from "react-router-dom";
import ProgramEditComponent from "./ProgramEditComponent";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

// 초기 상태 정의
const initState = {
  content: "",
  programName: "",
  uploadFiles: [],
};

const ProgramEditPage = () => {
  const { programId } = useParams();
  const programFiles = useRef(null);
  // 프로그램 상세 정보 상태
  const [data, setData] = useState(initState);
  // 새로 추가한 파일 리스트
  const [newfileList, setNewFileList] = useState([]);
  // 삭제된 파일 ID 리스트
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  // 모달 상태
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "",
    message: "",
    onConfirm: null,
  });

  // 프로그램 상세 데이터 가져오기
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getOne(programId);
        setData(res); // 가져온 데이터 상태에 저장
      } catch (error) {
        console.error("가져오기 실패", error);
      }
    };
    f();
  }, [programId]);

  // 파일 삭제 처리
  const deleteHandler = (e) => {
    const { name } = e.target;
    setDeletedFileIds((prev) => [...prev, name]); // 삭제 리스트에 추가
    const filtered = data.uploadFiles.filter((i) => i.fileNo != name); // 삭제 제외한 나머지 파일
    setData({
      ...data,
      uploadFiles: filtered, // 상태 갱신
    });
  };

  // 파일 업로드 처리
  const fileUploadHandler = (e) => {
    const { files } = e.target;
    const fileList = [];
    for (var i of files) {
      fileList.push(i); // 선택한 파일 배열로 변환
    }
    setNewFileList(fileList); // 상태에 저장
  };

  // 프로그램 수정 제출 처리
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const programUploadFile = programFiles.current.files;

    // 새로 업로드한 파일 formData에 추가
    for (var i of programUploadFile) {
      formData.append("files", i);
    }

    // 기존 프로그램 데이터 formData에 추가
    formData.append("pno", data.pno);
    formData.append("content", data.content);
    formData.append("programName", data.programName);
    formData.append("deletedNo", deletedFileIds);

    const f = async () => {
      try {
        setAlertModal({
          open: true,
          type: "confirm",
          message: "내용을 수정하시겠습니까?",
          onConfirm: async (i) => {
            setAlertModal({ open: false });
            if (i !== "ok") return; // 취소 시 종료
            await programModify(programId, formData); // 서버로 전송
            window.location.reload(); // 페이지 새로고침
          },
        });
      } catch (error) {
        console.error("보내기 실패", error);
      }
    };
    f();
  };

  // 수정 취소 처리
  const cancelHandler = () => {
    setAlertModal({
      open: true,
      type: "confirm",
      message: "내용을 취소하시겠습니까?",
      onConfirm: (i) => {
        setAlertModal({ open: false });
        if (i !== "ok") return;
        window.location.reload();
      },
    });
  };

  return (
    <div>
      <ProgramEditComponent
        submitHandler={submitHandler}
        data={data}
        setData={setData}
        fileUploadHandler={fileUploadHandler}
        programFiles={programFiles}
        deleteHandler={deleteHandler}
        newfileList={newfileList}
        cancelHandler={cancelHandler}
      />
      {alertModal.open && (
        <ModalComponent
          type={alertModal.type}
          message={alertModal.message}
          onConfirm={alertModal.onConfirm}
        />
      )}
    </div>
  );
};

export default ProgramEditPage;
