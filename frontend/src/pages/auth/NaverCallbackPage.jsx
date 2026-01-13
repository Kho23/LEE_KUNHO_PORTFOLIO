import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socialLoginSuccess } from "../../store/auth/authSlice";
import ModalComponent from "../../components/alertModal/AlertModalComponent";
import axios from "axios";

const NaverCallbackPage = () => {
  const [alertModal, setAlertModal] = useState({
    open: false,
    type: "", // alert | confirm
    message: "",
    onConfirm: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (state !== "naver") {
      alert("비정상 접근");
      navigate("/auth/login");
      return;
    }

    if (!code) {
      alert("네이버 로그인 실패");
      navigate("/auth/login");
      return;
    }

    const naverLogin = async () => {
      try {
        const res = await axios.post(
          "/api/auth/naver/login",
          {
            code,
          }
        );

        dispatch(
          socialLoginSuccess({
            accessToken: res.data.accessToken,
            memberRole: res.data.memberRole,
            loginId: res.data.loginId,
          })
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/");
      } catch (err) {
        console.error(err);

        if (err.response) {
          console.error("STATUS:", err.response.status);
          console.error("DATA:", err.response.data);
        }

        setAlertModal({
          open: true,
          type: "alert",
          message: "네이버 로그인 처리 중 오류",
        });
        navigate("/auth/login");
      }
    };

    naverLogin();
  }, []);

  return (
    <div className="p-10 text-center">
      네이버 로그인 처리 중...
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

export default NaverCallbackPage;
