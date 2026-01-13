import React, { useState } from "react";
import { getScheduleByDate } from "../../api/scheduleApi";
import ScheldulePageComponent from "./ScheldulePageComponent";

const ScheldulePage = () => {
  const [events, setEvents] = useState([]);
  const [currentMonthStr, setCurrentMonthStr] = useState("");

  const handleDatesSet = async (dateInfo) => {
    const startStr = dateInfo.startStr.substring(0, 10);
    const endStr = dateInfo.endStr.substring(0, 10);
    setCurrentMonthStr(dateInfo.view.title);

    try {
      const data = await getScheduleByDate(startStr, endStr);

      const mappedEvents = data.map((item) => ({
        id: item.scheduleId,
        title: item.title,
        start: item.startDate,
        end: item.endDate,
        extendedProps: { content: item.content },
        color: "#3b82f6",
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventClick = (info) => {
    alert(`[${info.event.title}]\n${info.event.extendedProps.content}`);
  };

  return (
    <div>
      <ScheldulePageComponent
        events={events}
        currentMonthStr={currentMonthStr}
        handleDatesSet={handleDatesSet}
        handleEventClick={handleEventClick}
      />
    </div>
  );
};

export default ScheldulePage;