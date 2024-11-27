import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

function ClubCalendar() {
  const [events, setEvents] = useState([
    {
      title: '월말회의',
      start: new Date(2024, 10, 26, 18, 0), // 월은 0부터 시작하므로 10은 11월입니다.
      end: new Date(2024, 10, 26, 20, 0),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('새로운 일정의 제목을 입력해주세요');
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  return (
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 500 }}
        messages={{
          next: "다음",
          previous: "이전",
          today: "오늘",
          month: "월",
          week: "주",
          day: "일",
          agenda: "일정",
        }}
      />
    </div>
  );
}

export default ClubCalendar;
