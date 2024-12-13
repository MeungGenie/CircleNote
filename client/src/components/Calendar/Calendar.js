import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

function ClubCalendar() {
  const [events, setEvents] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);

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

  const handleEventRightClick = (event, e) => {
    e.preventDefault();
    setContextMenu({
      mouseX: e.clientX,
      mouseY: e.clientY,
      event,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleEdit = async () => {
    const newTitle = window.prompt('수정할 제목을 입력해주세요', contextMenu.event.title);
    if (newTitle) {
      try {
        const response = await fetch(`http://localhost:5001/api/schedules/${contextMenu.event._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle }),
        });
        if (response.ok) {
          setEvents((prevEvents) =>
            prevEvents.map((evt) =>
              evt._id === contextMenu.event._id ? { ...evt, title: newTitle } : evt
            )
          );
        }
      } catch (error) {
        console.error('Error updating the event:', error);
      }
    }
    closeContextMenu();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/schedules/${contextMenu.event._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((evt) => evt._id !== contextMenu.event._id));
      }
    } catch (error) {
      console.error('Error deleting the event:', error);
    }
    closeContextMenu();
  };

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
    <div className="calendar-container" onClick={closeContextMenu}>
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
        onDoubleClickEvent={(event, e) => handleEventRightClick(event, e)}
      />
      {contextMenu && (
        <div
          className="context-menu"
          style={{
            position: 'absolute',
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            backgroundColor: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          <button onClick={handleEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
}

export default ClubCalendar;
