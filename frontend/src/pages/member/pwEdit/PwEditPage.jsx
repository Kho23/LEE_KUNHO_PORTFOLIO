import React, { useEffect, useState } from "react";
import PwEditComponent from "./components/PwEditComponent";
import { useNavigate } from "react-router-dom";
import { changePassword, getOne, register } from "../../../api/memberApi";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const PwEditPage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });
  const [data, setData] = useState({});
  const [formCheck, setFormCheck] = useState(data);
  const [pwCorrect, setPwCorrect] = useState(false);
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

  const pwCheckFn = (formCheck) => {
    const { memberPassword, memberPasswordCheck } = formCheck;
    if (
      memberPasswordCheck?.length > 0 &&
      memberPassword === memberPasswordCheck
    )
      return true;
    else return false;
  };

  useEffect(() => {
    const f = async () => {
      try {
        const data = await getOne();
        setData(data);
      } catch (err) {
        console.error("회원 정보 조회 실패", err);
        alert("회원 정보를 불러오지 못했습니다");
      }
    };
    f();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const newForm = { ...formCheck, [name]: value };
    setPwCorrect(pwCheckFn(newForm));
    setFormCheck(newForm);
    setData({ ...data, [name]: value });
  };

  const clickHandler = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(formCheck.memberPassword)) {
      alert("비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.");
      return;
    }

    if (!passwordRegex.test(formCheck.memberPasswordCheck)) {
      alert("비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다.");
      return;
    }

    setAlertModal({
      open: true,
      type: "confirm",
      message: "비밀번호를 변경하시겠습니까?",
      onConfirm: async (i) => {
        setAlertModal({ open: false });
        if (i !== "ok") return;

        try {
          await changePassword(formCheck);
          alert("비밀번호 변경이 완료되었습니다");
          navigate("/");
        } catch (err) {
          console.error("비밀번호 변경 실패", err);
          alert(err?.response?.data ?? "비밀번호 변경 중 오류가 발생했습니다");
        }
      },
    });
  };

  return (
    <div>
      <PwEditComponent
        changeHandler={changeHandler}
        clickHandler={clickHandler}
        pwCorrect={pwCorrect}
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

export default PwEditPage;
