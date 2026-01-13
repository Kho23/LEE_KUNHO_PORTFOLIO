import React, { useEffect, useState } from "react";
import DailyUseComponent from "./components/DailyUseComponent";
import {
  deleteDailyUse,
  deleteGymDailyUse,
  getDailyUseList,
  getGymDailyUseList,
} from "../../../api/dailyUseApi";
import ModalComponent from "../../../components/alertModal/AlertModalComponent";

const DailyUsePage = () => {
  const [dailyUse, setDailyUse] = useState([]);
  const [gymDailyUse, setGymDailyUse] = useState([]);

  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "alert",
    onConfirm: null,
  });

  const openModal = ({ message, type = "alert", onConfirm }) => {
    setModal({ open: true, message, type, onConfirm });
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyUseData = await getDailyUseList();
        const gymDailyUseData = await getGymDailyUseList();
        setDailyUse(dailyUseData);
        setGymDailyUse(gymDailyUseData);
      } catch {
        openModal({ message: "데이터 가져오기 실패" });
      }
    };
    fetchData();
  }, []);

  const cancelDailyUseHandler = (id) => {
    openModal({
      message: "정말 취소하시겠습니까?",
      type: "confirm",
      onConfirm: async (result) => {
        if (result === "ok") {
          try {
            await deleteDailyUse(id);
            openModal({
              message: "신청이 취소되었습니다.",
              onConfirm: () => window.location.reload(),
            });
          } catch {
            openModal({ message: "취소 중 오류가 발생했습니다." });
          }
        }
      },
    });
  };

  const cancelGymHandler = (id) => {
    openModal({
      message: "신청을 취소하시겠습니까?",
      type: "confirm",
      onConfirm: async (result) => {
        if (result === "ok") {
          try {
            await deleteGymDailyUse(id);
            openModal({
              message: "신청이 취소되었습니다.",
              onConfirm: () => window.location.reload(),
            });
          } catch {
            openModal({ message: "취소 중 오류가 발생했습니다." });
          }
        }
      },
    });
  };

  return (
    <>
      <DailyUseComponent
        dailyUse={dailyUse}
        gymDailyUse={gymDailyUse}
        cancelDailyUseHandler={cancelDailyUseHandler}
        cancelGymHandler={cancelGymHandler}
      />

      {modal.open && (
        <ModalComponent
          message={modal.message}
          type={modal.type}
          onConfirm={(result) => {
            modal.onConfirm?.(result);
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default DailyUsePage;
