import { useState } from "react";
import { apiSearch } from "../api";


export default function Search() {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);


async function runSearch(e) {
e.preventDefault();
const data = await apiSearch(query);
setResults(data.results || []);
}


return (
<div>
<h1>Search</h1>
<form onSubmit={runSearch}>
<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
<button type="submit">Go</button>
</form>


<ul>
{results.map((r, i) => (
<li key={i}>
<a href={r.url} target="_blank">{r.title}</a>
<p>{r.snippet}</p>
</li>
))}
</ul>
</div>
);
}