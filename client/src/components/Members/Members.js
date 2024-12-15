import React, { useEffect, useState } from 'react';
import './Members.css';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members"); // Adjust API endpoint as needed
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="members-container">
      <div className="members-grid">
        {members.map((member) => (
          <div key={member._id} className="member-card">
            <img
              src={member.profileImage || 'default-profile.png'}
              alt={`${member.name} 프로필`}
              className="member-photo"
            />
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
