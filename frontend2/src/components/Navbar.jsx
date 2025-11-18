import { Link } from "react-router-dom";


export default function Navbar() {
return (
<nav style={{display:"flex", gap:"20px", padding:"10px"}}>
<Link to="/">Dashboard</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
<Link to="/search">Search</Link>
</nav>
);
}