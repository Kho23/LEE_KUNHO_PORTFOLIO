import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOne, modify } from "../../../api/memberApi";
import MemberEditComponent from "./components/MemberEditComponent";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const MemberEditPage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });

  const [data, setData] = useState({});
  const [formCheck, setFormCheck] = useState(data);
  const [userGender, setUserGender] = useState([false, false]);
  const [userBirth, setUserBirth] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

  const isCheck = () => {
    // 필수 입력값(이메일, 전화번호)이 모두 입력되었는지 확인하는 함수
    const { memberEmail, memberPhoneNumber } = formCheck;
    if (memberEmail === "" || memberPhoneNumber === "") return false;
    else return true;
  }; // 둘 중 하나라도 비어 있으면 false 반환, 모두 입력되어 있으면 true 반환

  useEffect(() => {
    // 회원 정보를 서버에서 불러오는 비동기 함수
    (async () => {
      const data = await getOne(); // 회원 정보 조회 API 호출
      setData(data); // 해당 회원 정보 상태 저장
      if (data.memberBirthDate) {
        // 생년월일이 존재하면 yyyy-mm-dd 형식으로 가공하여 저장
        setUserBirth(data.memberBirthDate.substring(0, 10));
      }
      if (data.memberGender === "남자") {
        setUserGender([true, false]);
      } else {
        setUserGender([false, true]);
      } // 성별 값에 따라 라디오 버튼 상태 설정
    })();
    console.log("data", data);
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setFormCheck({ ...formCheck, [name]: value });
  };

  const openAddress = () => {
    new window.daum.Postcode({
      oncomplete: (addressData) => {
        setData((data) => ({
          ...data,
          ["memberAddress"]: addressData.address,
        }));
      },
    }).open();
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(data.memberEmail)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (isCheck(formCheck)) {
      setAlertModal({
        open: true,
        type: "confirm",
        message: "회원 정보를 수정하시겠습니까?",
        onConfirm: async (i) => {
          setAlertModal({ open: false });
          if (i !== "ok") return;
          try {
            await modify(data);
            alert("회원 정보가 수정되었습니다.");
            navigate("/");
          } catch (err) {
            console.error("제출 실패", err);
            alert("제출 중 오류가 발생했습니다");
          }
        },
      });
    } else {
      alert("필수 정보를 모두 입력해 주세요");
    }
  };

  return (
    <div>
      <MemberEditComponent
        data={data}
        openAddress={openAddress}
        changeHandler={changeHandler}
        clickHandler={clickHandler}
        userGender={userGender}
        userBirth={userBirth}
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

export default MemberEditPage;
