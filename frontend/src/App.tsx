import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const loginGoogle = () => {
    window.location.href = 'http://localhost:4000/api/auth/google';
  };

  const loginGitHub = () => {
    window.location.href = 'http://localhost:4000/api/auth/github';
  };

  const logout = () => {
    fetch('http://localhost:4000/api/auth/logout', { credentials: 'include' })
      .then(() => setUser(null));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {user ? (
        <>
          <img src={user.photos?.[0]?.value} alt="avatar" className="w-16 h-16 rounded-full" />
          <p className="mt-2 font-bold">{user.displayName}</p>
          <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </>
      ) : (
        <>
          <button onClick={loginGoogle} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">Login with Google</button>
          <button onClick={loginGitHub} className="bg-gray-800 text-white px-4 py-2 rounded">Login with GitHub</button>
        </>
      )}
    </div>
  );
}

export default App
