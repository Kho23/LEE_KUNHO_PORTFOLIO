import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GuideEditComponent from "./components/GuideEditComponent";
import { getCategory, upload } from "../../../api/guideApi";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const GuideEditPage = () => {
  const categoryName = {
    TIME: "운영시간",
    RENT: "상품대여",
    CAR: "차량등록",
    PRICE: "요금안내",
    REFUND: "할인/환불/연기",
  };

  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });

  const [content, setContent] = useState("");
  const [savedFile, setSavedFile] = useState([]);
  const [categoryFinalName, setcategoryFinalName] = useState("");
  const [fileName, setFilelName] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  const { category } = useParams();
  const guideFiles = useRef(null);

  useEffect(() => {
    const changeCategory = async () => {
      const upper = category.toUpperCase();
      try {
        const res = await getCategory(upper);
        setSavedFile(res.uploadFiles);
        setContent(res.html ?? "");
        setcategoryFinalName(categoryName[upper]);
      } catch (e) {
        console.error(e);
      }
    };
    changeCategory();
  }, [category]);

  const deleteHandler = (e) => {
    const { name } = e.target;
    const forFilter = savedFile.filter((i) => i.fileNo != name);
    setDeletedFileIds((i) => [...i, name]);
    setSavedFile(forFilter);
  };

  const fileUploadHandler = (e) => {
    const { files } = e.target;
    const fileList = [];
    for (var i of files) {
      fileList.push(i);
    }
    setFilelName(fileList);
  };

  const saveHandler = () => {
    const formData = new FormData();
    const guideUploadFile = guideFiles.current?.files;
    for (var i of guideUploadFile) {
      formData.append("files", i);
    }
    formData.append("category", category.toUpperCase());
    formData.append("html", content);
    formData.append("deletedNo", deletedFileIds);

    setAlertModal({
      open: true,
      type: "confirm",
      message: "내용을 수정하시겠습니까?",
      onConfirm: async (i) => {
        setAlertModal({ open: false });
        if (i !== "ok") return;
        await upload(formData);
        window.location.reload();
      },
    });
  };

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

  const EditorChangeHandler = (_, editor) => {
    setContent(editor.getData());
  };

  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "link",
        "blockQuote",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
    },

    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },

    language: "ko",
  };

  return (
    <div>
      <GuideEditComponent
        saveHandler={saveHandler}
        categoryFinalName={categoryFinalName}
        content={content}
        EditorChangeHandler={EditorChangeHandler}
        editorConfig={editorConfig}
        fileUploadHandler={fileUploadHandler}
        guideFiles={guideFiles}
        deleteHandler={deleteHandler}
        cancelHandler={cancelHandler}
        fileName={fileName}
        savedFile={savedFile}
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

export default GuideEditPage;
