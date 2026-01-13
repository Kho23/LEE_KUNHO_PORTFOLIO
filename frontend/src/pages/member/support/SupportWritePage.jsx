import { useRef, useState } from "react";
import SupportWriteComponent from "./components/SupportWriteComponent";
import { useNavigate } from "react-router-dom";
import { supportReqRegister } from "../../../api/memberApi";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const SupportWritePage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });
  const [support, setSupport] = useState({ title: "", content: "" });
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const supportFiles = useRef(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setSupport({ ...support, [name]: value });
  };

  const fileHandler = (e) => {
    const { files } = e.target;
    const fileName = [];
    for (const file of files) {
      fileName.push(file.name);
    }
    setFiles(fileName);
  };

  const cancelHandler = () => {
    setSupport({ title: "", content: "" });
    setFiles([]);
    navigate(`/member`);
  };

  const submitHandler = async () => {
    if (support.title.length >= 2 && support.content.length >= 5) {
      const formData = new FormData();

      const supportFile = supportFiles.current.files;
      for (let i of supportFile) {
        formData.append("supportFiles", i);
      }
      formData.append("supportTitle", support.title);
      formData.append("supportContent", support.content);

      setAlertModal({
        open: true,
        type: "confirm",
        message: "문의를 제출하시겠습니까?",
        onConfirm: async (i) => {
          setAlertModal({ open: false });
          if (i !== "ok") return;
          try {
            await supportReqRegister(formData);
            alert("문의가 제출되었습니다. 빠른 시일 내에 답변드리겠습니다.");
            navigate(`/member`);
          } catch (err) {
            console.error("제출 실패", err);
            alert("제출 중 오류가 발생했습니다");
          }
        },
      });
    } else if (support.title.length < 2 && support.content.length >= 5) {
      alert("제목은 두 글자 이상 적어주세요");
    } else if (support.title.length >= 2 && support.content.length < 5) {
      alert("내용은 다섯 글자 이상 적어주세요");
    } else {
      alert("제목은 두 글자 이상, 내용은 다섯 글자 이상 적어주세요");
    }
  };

  return (
    <div>
      <SupportWriteComponent
        changeHandler={changeHandler}
        supportFiles={supportFiles}
        fileHandler={fileHandler}
        files={files}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
        support={support}
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

export default SupportWritePage;
