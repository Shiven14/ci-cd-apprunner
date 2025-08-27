import { useState } from "react";
import copy from "copy-to-clipboard";
type Ok = { code: string; shortUrl: string; longUrl: string };
type Err = { error: string };
type Resp = Ok | Err;
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? "";
export default function App() {
  const [longUrl, setLongUrl] = useState(""); const [result, setResult] = useState<Ok | null>(null);
  const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  async function shorten(e: React.FormEvent) {
    e.preventDefault(); setError(null); setResult(null);
    const url = longUrl.trim(); if (!/^https?:\/\//i.test(url)) { setError("Enter a valid URL starting with http:// or https://"); return; }
    try {
      setLoading(true);
      const r = await fetch(`${API_BASE}/links`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ longUrl: url }) });
      const data = (await r.json()) as Resp; if (!r.ok || "error" in data) { setError("error" in data ? data.error : "Server error"); return; }
      setResult(data as Ok);
    } catch { setError("Network error"); } finally { setLoading(false); }
  }
  return (
    <>
      <nav className="nav"><div className="brand"><span className="dot" /><span>igloo-style</span></div></nav>
      <section className="hero"><h1 className="title">Frosty-fast URL shortener</h1><p className="subtitle">Serverless on AWS (Lambda + API Gateway + DynamoDB). Free-tier friendly.</p></section>
      <section className="card">
        <form onSubmit={shorten} className="row">
          <div className="grow"><input className="input" placeholder="https://example.com" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} /></div>
          <button className="button" disabled={loading}>{loading ? "Shortening…" : "Shorten"}</button>
        </form>
        {error && (<div style={{ color: "#b91c1c", marginTop: 12, fontWeight: 600 }}>{error}</div>)}
        {result && (
          <div className="result">
            <div style={{ fontSize: 12, color: "#64748b" }}>Short URL</div>
            <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
            <button className="button" style={{ padding: "10px 14px" }} type="button" onClick={() => copy(result.shortUrl)}>Copy</button>
          </div>
        )}
        <div className="kpi"><span className="badge">⚡ Edge-fast redirects</span><span className="badge">🧊 Glass UI</span><span className="badge">🧰 Open source</span></div>
      </section>
      <footer className="footer">Built with React + Vite · Deployed on GitHub Pages · API on AWS</footer>
    </>
  );
}
