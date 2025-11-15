const API = "http://localhost:5000";


export async function apiLogin(username, password) {
const res = await fetch(`${API}/login`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ username, password })
});
return res.json();
}


export async function apiRegister(username, password) {
const res = await fetch(`${API}/register`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ username, password })
});
return res.json();
}


export async function apiSearch(query) {
const res = await fetch(`${API}/search?query=${encodeURIComponent(query)}`);
return res.json();
}