import React, { useEffect, useState } from "react";
import {
  getScheduleList,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../../../api/adminApi";
import usePageMove from "../../../../hooks/usePageMove";
import ScheduleListComponent from "./ScheduleListComponent";
import ModalComponent from "../../../../components/alertModal/AlertModalComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCnt: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ScheduleListPage = () => {
  // 일정 목록과 페이징 데이터를 관리
  const [schedules, setSchedules] = useState(initState);
  // 일정 등록/수정 모달 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 현재 선택된 일정(수정 시 사용)
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const { page, size, moveToList } = usePageMove();

  // 일정 등록/수정 폼 데이터 관리
  const [data, setData] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
  });

  // 알림/확인 모달 상태 관리
  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "alert",
    onConfirm: null,
  });

  // 메시지 모달을 여는 공통 함수
  const openMessageModal = ({ message, type = "alert", onConfirm }) => {
    setModal({ open: true, message, type, onConfirm });
  };

  // 메시지 모달을 닫는 함수
  const closeMessageModal = () => {
    setModal({ ...modal, open: false });
  };

  // 페이지 번호 또는 사이즈 변경 시 일정 목록 조회
  useEffect(() => {
    const f = async () => {
      try {
        const response = await getScheduleList({ page, size });
        setSchedules(response);
      } catch (err) {
        // 일정 목록 조회 실패 시 알림 표시
        openMessageModal({ message: "데이터 로딩 실패" });
      }
    };
    f();
  }, [page, size]);

  // 일정 등록 또는 수정 모달을 여는 함수
  const openFormModal = (schedule) => {
    if (schedule) {
      // 수정인 경우 기존 일정 데이터를 폼에 세팅
      setCurrentSchedule(schedule);
      setData({
        title: schedule.title,
        content: schedule.content,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
      });
    } else {
      // 신규 등록인 경우 초기값 세팅
      setCurrentSchedule(null);
      setData({
        title: "",
        content: "",
        startDate: "",
        endDate: "",
      });
    }
    setIsModalOpen(true);
  };

  // 일정 삭제 처리 함수
  const handleDelete = (scheduleId) => {
    // 삭제 여부를 묻는 확인 모달 표시
    openMessageModal({
      message: "정말 삭제하시겠습니까?",
      type: "confirm",
      onConfirm: async (result) => {
        if (result === "ok") {
          try {
            await deleteSchedule(scheduleId);
            openMessageModal({
              message: "삭제되었습니다.",
              onConfirm: () => window.location.reload(),
            });
          } catch {
            // 삭제 중 오류 발생 시 알림
            openMessageModal({ message: "삭제 중 오류 발생" });
          }
        }
      },
    });
  };

  // 일정 등록/수정 저장 처리 함수
  const handleSave = async () => {
    // 필수 입력값 검증
    if (!data.title || !data.startDate || !data.endDate) {
      openMessageModal({ message: "제목과 날짜는 필수입니다." });
      return;
    }

    try {
      if (currentSchedule) {
        // 수정인 경우 일정 업데이트
        await updateSchedule(currentSchedule.scheduleId, data);
        openMessageModal({
          message: "수정 완료",
          onConfirm: () => window.location.reload(),
        });
      } else {
        // 신규 등록인 경우 일정 생성
        await createSchedule(data);
        openMessageModal({
          message: "등록 완료",
          onConfirm: () => window.location.reload(),
        });
      }
      setIsModalOpen(false);
    } catch {
      openMessageModal({ message: "저장 실패" });
    }
  };

  // 입력 폼 변경 시 data 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <ScheduleListComponent
        openModal={openFormModal}
        schedules={schedules}
        page={page}
        size={size}
        handleDelete={handleDelete}
        moveToList={moveToList}
        isModalOpen={isModalOpen}
        currentSchedule={currentSchedule}
        handleChange={handleChange}
        data={data}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
      />

      {modal.open && (
        <ModalComponent
          message={modal.message}
          type={modal.type}
          onConfirm={(result) => {
            modal.onConfirm?.(result);
            closeMessageModal();
          }}
        />
      )}
    </>
  );
};

export default ScheduleListPage;
