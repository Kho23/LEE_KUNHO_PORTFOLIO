import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const ScheldulePageComponent = ({
  events,
  currentMonthStr,
  handleDatesSet,
  handleEventClick,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <nav className="text-sm text-gray-500 mb-6">홈 &gt; 커뮤니티 &gt; 일정</nav>
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">일정</h1>
      </div>
      <div className="border-b-2 border-gray-400 mb-6" />

      <style>{`
        .fc-toolbar-title { font-size: 1.5rem !important; font-weight: 700 !important; }
        .fc-button-primary {
          background-color: white !important;
          border-color: #e5e7eb !important;
          color: #374151 !important;
          font-weight: 600 !important;
        }
        .fc-button-active { background-color: #f3f4f6 !important; color: black !important; }
        
        .fc-col-header-cell-cushion, .fc-daygrid-day-number {
          text-decoration: none !important;
          color: #374151;
          font-weight: 600;
        }

        .fc-col-header-cell.fc-day-sun .fc-col-header-cell-cushion { color: #ef4444 !important; }
        .fc-col-header-cell.fc-day-sat .fc-col-header-cell-cushion { color: #2563eb !important; }
        
        .fc-day-sun .fc-daygrid-day-number { color: #ef4444 !important; }
        .fc-day-sat .fc-daygrid-day-number { color: #2563eb !important; }

        .fc-day-today { background-color: #eff6ff !important; }
        .fc-theme-standard td, .fc-theme-standard th { border-color: #e5e7eb !important; }
      `}</style>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          events={events}
          datesSet={handleDatesSet}
          eventClick={handleEventClick}
          height="auto"
          dayMaxEvents={true}
          dayCellContent={(info) => {
            return info.dayNumberText.replace("일", "");
          }}
        />
      </div>

      {/* 일정 리스트 영역 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="mr-2">📅</span> {currentMonthStr} 일정 목록
          </h3>
        </div>
        {events.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            해당 월에는 등록된 일정이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium w-1/4">기간</th>
                  <th className="px-6 py-3 font-medium">제목</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="font-medium">{evt.start}</span>
                        {evt.start !== evt.end && (
                          <>
                            <span className="hidden sm:inline text-gray-400">~</span>
                            <span className="font-medium">{evt.end}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-base font-semibold text-gray-800 block mb-1">
                        {evt.title}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheldulePageComponent;