import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProgramEditComponent from "./ProgramEditComponent";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";
import { fileRegister } from "../../../api/fileApi";
import { getOne } from "../../../api/programApi";

// 초기 상태 정의
const initState = {
  content: "",
  pno: 0,
  programName: "",
  uploadFiles: [],
};

const ProgramEditPage = () => {

  const { id } = useParams();
  const [program, setProgram] = useState(initState);
  const [fnoList, setFnoList] = useState([]);
  const [deletedFnoList, setDeletedFnoList] = useState([]);
  useEffect(() => {
    const getProgram = async () => {
      try {
        const res = await getOne(id);
        setProgram(res)
      } catch (error) {
        console.log("error: ", error)
        alert("프로그램 안내 조회 중 오류가 발생했습니다.")
      }
    }
    getProgram();
  }, [id])


  const fileUploadHandler = async (e) => {
    const files = e.target.files; // 요청 보내는 파일리스트
    const image = new FormData();
    if (files.length === 0 || !files) return;
    for (const file of files) {
      image.append("files", file) //파일 리스트를 image 에 담음
    }
    try {
      const res = await fileRegister(image, "program");
      // 도메인으로 program 설정 후 파일목록 보내주고 Map<"fileData", {fno, ...} > 를 res로 받음
      const newFiles = res.fileData;
      const newFnoList = newFiles.map(file => file.fno); // fno 리스트 
      setFnoList(prev => [...prev, ...newFnoList]); // 기존 파일번호 목록에서 새 파일번호 추가 
      setProgram(prev => ({ ...prev, uploadFiles: [...prev.uploadFiles, ...newFiles] })) // 기존 프로그램의 파일에 새 파일 추가   
    } catch (error) {
      alert("프로그램 수정 중 오류가 발생했습니다.")
      console.log("error: ", error);
    }
  }

  const deleteHandler = (fno) => {
    setDeletedFnoList(prev => [...prev, fno]); // 삭제된 파일번호 목록 추가
    setFnoList(prev => prev.filter(f => f !== fno)); // fno 목록에서는 삭제 된 번호 목록 제거
    setProgram(prev => ({ ...prev, uploadFiles: prev.uploadFiles.filter(f => (f.fileNo || f.fno) !== fno) }))
    // 기존 프로그램의 파일에서 삭제 눌림 fno 지우기
  }

  const cancelHandler = () => {
    window.history.back();
  }

  const submitHandler = async (program) => {
    e.preventDefault()
    const payload = {
      pno: program.pno,
      content: program.content,
      programName: program.programName,
      fnoList: fnoList,
      deletedNo: deletedFnoList
    }
    try {
      await programModify(payload);
      alert("프로그램 수정이 완료되었습니다.")
      window.location.reload()
    } catch (error) {
      console.log("error: ", error);
      alert("프로그램 수정 중 오류가 발생했습니다.");
    }


  }



  return (
   <div>
      <ProgramEditComponent
        submitHandler={submitHandler}
        data={program}
        setData={setProgram} // ✅ setData에 setProgram 연결
        fileUploadHandler={fileUploadHandler}
        deleteHandler={deleteHandler}
        cancelHandler={cancelHandler}
        // 안 쓰는 props 제거함 (programFiles, newfileList)
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
