import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import profile_logo1 from './profile_logo1.png';
import challenge from './challenge.png';
import userimg from './userimage.jpeg';
import { socket } from "C:/IP-1/frontend/src/index.js";

const Userhomepage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [users, setUsers] = useState([]);

  const handleJoinTest = async (examType) => {
    window.location.href = `/test?name=${examType}`;
  };

  const logout = () => {
    console.log("Initiating Logout");
    socket.emit("updateStatus", email);
    window.location.href = `/login`;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('username');
  const email = queryParams.get('email');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/getUsers`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors'
        });
        if (!res.ok) {
          throw new Error('Failed to fetch Users');
        }
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();

    // Listen for "updatePrevStatus" event from the server
    socket.on("updatePrevStatus", (data) => {
      // Update the online status of the specific user
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.email === data.email) {
            return { ...user, is_online: data.newStatus };
          }
          return user;
        });
      });
    });

    // Clean up socket event listener
    return () => {
      socket.off("updatePrevStatus");
    };
  }, []);


  return (
    <div className="App">
      <header className="exammodule-header">
        <div className="exammodule-logo" onClick={() => setShowSidebar(!showSidebar)}>
          <img src={profile_logo1} alt="profile_logo" />
        </div>
        <h4 id="nameHeading">Hello, {name}</h4>
        <div className="navbar-nav ml-auto">
          <img src={challenge} alt="challenge-a-friend" id="challenge" />
        </div>
        <div>
          <button className="exammodule-logo" type="button" id="logout" onClick={()=>logout()} >Logout</button>
        </div>
      </header>

      <div className="exammodule-body">
        <div className={`exammodule-sidebar ${showSidebar ? 'show' : ''}`}>
          <h2>User Information</h2>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
          <div className="exam-list">
            <div className="exam-item" onClick={() => handleJoinTest('cpp')}>
              <div className="exam-name">C++ Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('cpp')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('java')}>
              <div className="exam-name">Java Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('java')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('html')}>
              <div className="exam-name">HTML Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('html')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('javascript')}>
              <div className="exam-name">JavaScript Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('javascript')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('c')}>
              <div className="exam-name">C Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('c')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('Python')}>
              <div className="exam-name">Python Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('Pyhton')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('React')}>
              <div className="exam-name">React Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('React')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('CSS')}>
              <div className="exam-name">CSS Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('CSS')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('Operating System')}>
              <div className="exam-name">Operating System Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('Operating System')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('Computer Network')}>
              <div className="exam-name">Computer Network Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('Computer Network')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('DBMS')}>
              <div className="exam-name">DBMS Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('DBMS')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('SQL')}>
              <div className="exam-name">SQL Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('SQL')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('IOT')}>
              <div className="exam-name">IOT Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('IOT')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('ML')}>
              <div className="exam-name">Machine Learning Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('ML')}>
                  Join the Test
                </button>
              </div>
            </div>
            <div className="exam-item" onClick={() => handleJoinTest('AI')}>
              <div className="exam-name">AI Exam</div>
              <div className="exam-details">
                <div className="mcq-count">20 MCQs</div>
                <button type="button" onClick={() => handleJoinTest('AI')}>
                  Join the Test
                </button>
              </div>
            </div>
          </div>
          <div className="user-list ml-auto">
          <h2>Online Users</h2>
          {users.map((user, index) => (
            <div className="user-item" key={index}>
              <div className="user-image">
                <img src={userimg} alt={`user${index + 1}`} />
              </div>
              <div className={`user-info`}>
                <p className="fetched">Username: {user.name}</p>
                <p className="fetched">Email: {user.email}</p>
                <span className={`${user.is_online ? user.is_online : "Offline"}`}>{user.is_online ? user.is_online : "Offline"}</span>
                <button className="challenge-button">Challenge</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userhomepage;