import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();
  const moveToLogin = () => navigate("/auth/login");
  const moveToMain = () => navigate("/");
  const moveToNotice = (id) => navigate(`/community/notice`);
  const moveToNoticeDetail = (id) => navigate(`/community/notice/${id}`);
  const moveToGallery = () => navigate("/community/gallery");
  const moveToGalleryDetail = (id) => navigate(`/community/gallery/${id}`);
  const moveToAdminGallery = () => navigate("/admin/gallery");
  const moveToAdminGalleryRegister = () => navigate("/admin/gallery/register");
  const moveToAdminGalleryDetail = (id) => navigate(`/admin/gallery/${id}`);
  const moveToAdmin = () => navigate("/admin");
  const moveToFindId = () => navigate("/auth/find-id");
  const moveToFindPw = () => navigate("/auth/find-pw");
  const moveToRegister = () => navigate("/auth/register");
  const moveToAdminNoticeDetail = (id) => navigate(`/admin/notice/${id}`);
  const moveToAdminPartnerRequestDetail = (id) =>
    navigate(`/admin/member/partnerRequest/${id}`);
  const moveToAdminSupportDetail = (id) =>
    navigate(`/admin/member/support/${id}`);
  const moveToLessonDetail = (id) => {
    navigate(`/reservation/registration/${id}`);
  };
  const moveToLessonList = () => {
    navigate(`/reservation/registration`);
  };
  const moveToAdminLessonDetail = (id) => {
    navigate(`/admin/lesson/approve/${id}`);
  };
  const moveToAdminRentalDetail = (id) => {
    navigate(`/admin/rental/approve/${id}`);
  };
  const moveToAdminApprovals = (type, id) => {
    switch (type) {
      case "강좌개설":
        navigate(`/admin/lesson/approve/${id}`);
        break;
      case "대관신청":
        navigate(`/admin/rental/approve/${id}`);
        break;
      case "파트너":
        navigate(`/admin/member/partnerRequest/${id}`);
        break;
    }
  };

  return {
    moveToLessonList,
    moveToLessonDetail,
    moveToAdminGalleryRegister,
    moveToAdminGallery,
    moveToAdminGalleryDetail,
    moveToRegister,
    moveToFindId,
    moveToNotice,
    moveToFindPw,
    moveToLogin,
    moveToMain,
    moveToNoticeDetail,
    moveToGallery,
    moveToGalleryDetail,
    moveToAdminNoticeDetail,
    moveToAdmin,
    moveToAdminPartnerRequestDetail,
    moveToAdminSupportDetail,
    moveToAdminLessonDetail,
    moveToAdminRentalDetail,
    moveToAdminApprovals,
  };
};

export default useCustomMove;
