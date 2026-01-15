function Result({ matched, missing, percent }) {
  return (
    <div className="result">
      <h2>Match Percentage: {percent}%</h2>

      <h3>Matched Skills</h3>
      {matched.length === 0 ? <p>None</p> : matched.map((s) => <li key={s.skill}>{s.skill}</li>)}

      <h3 style={{ color: "red" }}>Missing Skills</h3>
      {missing.length === 0 ? (
        <p>None</p>
      ) : (
        missing.map((s) => (
          <li key={s.skill}>
            <span style={{ color: "red" }}>{s.skill}</span>{" "}
            <a href={s.link} target="_blank" rel="noreferrer">
              Learn
            </a>
          </li>
        ))
      )}
    </div>
  );
}

export default Result;
