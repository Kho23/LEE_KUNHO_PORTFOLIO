import React, { useEffect, useState } from "react";
import MyLessonsComponent from "./components/MyLessonsComponent";
import { getMyLessons } from "../../../api/partnerApi";
import MyLessonDetailComponent from "./components/MyLessonDetailComponent";

const MyLessonsPage = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [getOneData, setGetOneData] = useState({});

  useEffect(() => {
    const f = async () => {
      const res = await getMyLessons();
      setData(res);
    };
    f();
  }, []);

  const openModal = (i) => {
    setModalOpen(true);
    setGetOneData(i);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <MyLessonsComponent
        data={data}
        modalOpen={modalOpen}
        openModal={openModal}
      />
      <MyLessonDetailComponent
        modalOpen={modalOpen}
        closeModal={closeModal}
        getOneData={getOneData}
      />
    </div>
  );
};

export default MyLessonsPage;
