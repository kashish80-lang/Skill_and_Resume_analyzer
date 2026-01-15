import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jd", jd);

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not running");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Skill vs Resume Analyzer</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <textarea
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <button onClick={handleSubmit}>Analyze Resume</button>

        {result && (
          <>
            {/* 🔥 MATCH PERCENTAGE */}
            <div className="progress-box">
              <div
                className="progress-bar"
                style={{ width: `${result.match_percentage}%` }}
              />
              <span>
                Matched Skills: {result.match_percentage}%
              </span>
            </div>

            <p className="summary">
              Resume matches {result.match_percentage}% of required skills
            </p>

            <div className="section">
              <h3>
                ✅ Matched Skills ({result.matched_skills.length})
              </h3>
              <div className="chips">
                {result.matched_skills.map((s, i) => (
                  <span key={i} className="chip success">{s}</span>
                ))}
              </div>
            </div>

            <div className="section">
              <h3>
                ❌ Missing Skills (click to learn) ({result.missing_skills.length})
              </h3>
              <div className="chips">
                {result.missing_skills.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="chip danger"
                  >
                    {item.skill}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
