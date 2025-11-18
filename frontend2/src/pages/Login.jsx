import { useState } from "react";
import { apiLogin } from "../api";
import { useNavigate } from "react-router-dom";


export default function Login() {
const nav = useNavigate();
const [username, setUser] = useState("");
const [password, setPass] = useState("");
const [msg, setMsg] = useState("");


async function submit(e) {
e.preventDefault();
const res = await apiLogin(username, password);
if (res.error) setMsg(res.error);
else nav("/");
}


return (
<div>
<h1>Login</h1>
<form onSubmit={submit}>
<input placeholder="Username" value={username}
onChange={e => setUser(e.target.value)} />
<input placeholder="Password" type="password" value={password}
onChange={e => setPass(e.target.value)} />
<button type="submit">Login</button>
</form>
{msg && <p style={{color: "red"}}>{msg}</p>}
</div>
);
}