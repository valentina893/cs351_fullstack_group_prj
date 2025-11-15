import { useState } from "react";
import { apiRegister } from "../api";
import { useNavigate } from "react-router-dom";


export default function Register() {
const nav = useNavigate();
const [username, setUser] = useState("");
const [password, setPass] = useState("");
const [msg, setMsg] = useState("");


async function submit(e) {
e.preventDefault();
const res = await apiRegister(username, password);
if (res.error) setMsg(res.error);
else nav("/login");
}


return (
<div>
<h1>Create Account</h1>
<form onSubmit={submit}>
<input placeholder="Username" value={username}
onChange={e => setUser(e.target.value)} />
<input placeholder="Password" type="password" value={password}
onChange={e => setPass(e.target.value)} />
<button type="submit">Register</button>
</form>
{msg && <p style={{color:"red"}}>{msg}</p>}
</div>
);
}