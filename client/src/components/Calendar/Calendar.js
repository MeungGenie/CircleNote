import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

function ClubCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/schedules');
        const data = await response.json();
        setEvents(
          data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        );
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  // 새로운 일정 추가
  const handleSelectSlot = async ({ start, end }) => {
    const title = window.prompt('새로운 일정의 제목을 입력해주세요');
    if (title) {
      const newEvent = { title, start, end };
      try {
        const response = await fetch('http://localhost:5001/api/schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent),
        });
        if (response.ok) {
          const savedEvent = await response.json();
          setEvents((prevEvents) => [
            ...prevEvents,
            {
              ...savedEvent,
              start: new Date(savedEvent.start),
              end: new Date(savedEvent.end),
            },
          ]);
        } else {
          console.error('Failed to save the event');
        }
      } catch (error) {
        console.error('Error saving the event:', error);
      }
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
