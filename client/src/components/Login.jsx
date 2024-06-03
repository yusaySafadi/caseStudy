import { useState } from 'react';
import {useNavigate} from "react-router-dom";


const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = 'Basic ' + btoa(`${username}:${password}`);
            const response = await fetch('http://localhost:3000/api/admin', {
                headers: {
                    'Authorization': auth
                }
            });
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            const data = await response.json();
            const {role} = data;
            setUser({ username, role, auth });
            localStorage.setItem('auth', auth);
            navigate("/") //redirect after successful login
        } catch (err) {
            console.log(err)
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
