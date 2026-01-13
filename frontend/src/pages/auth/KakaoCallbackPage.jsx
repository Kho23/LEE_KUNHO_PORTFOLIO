import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socialLoginSuccess } from "../../store/auth/authSlice";
import ModalComponent from "../../components/alertModal/AlertModalComponent";
import axios from "axios";

const KakaoCallbackPage = () => {
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

    if (!code) {
      alert("카카오 로그인 실패");
      navigate("/auth/login");
      return;
    }

    const kakaoLogin = async () => {
      try {
        const res = await axios.post(
          "/api/auth/kakao/login",
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
          message: "카카오 로그인 처리 중 오류",
        });
        navigate("/auth/login");
      }
    };

    kakaoLogin();
  }, []);

  return (
    <div className="p-10 text-center">
      카카오 로그인 처리 중...
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

export default KakaoCallbackPage;
