import React from 'react';
import './Members.css';
import userImg from './user.png';

function Members() {
  const members = [
    { id: 1, name: '이소흔', generation: '30기', role: '회장', photo: {userImg}},
    { id: 2, name: '김유진', generation: '30기', role: '부회장', photo: {userImg}},
    { id: 3, name: '김은진', generation: '31기', role: '인사부장', photo:{userImg}}
    // 필요한 멤버 정보를 추가하세요
  ];

  return (
    <div className="members-container">
      <div className="members-grid">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <img src={member.photo} alt={`${member.name} 프로필`} className="member-photo" />
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.generation}</p>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
