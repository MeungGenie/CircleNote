import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/auth';

const handleError = (error) => {
  if (error.response) {
    console.error(`Error ${error.response.status}:`, error.response.data);
    throw error.response.data;
  } else {
    console.error('Server error:', error.message);
    throw new Error('Server error');
  }
};

// 회원가입 서비스
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 로그인 서비스
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // 로그인 토큰을 로컬 스토리지에 저장
    }
    return response.data.token;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};


// 로그아웃 서비스
const logout = (navigate) => {
  localStorage.removeItem('token');
  if (navigate) navigate('/login');
};

// 인증된 사용자 정보를 가져오는 서비스
const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please login.');
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const authService = {
  register,
  login,
  logout,
  getUser,
};

export default authService;
