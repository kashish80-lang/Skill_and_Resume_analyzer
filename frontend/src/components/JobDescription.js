function JobDescription({ setJobDesc }) {
  return (
    <div className="box">
      <h3>Job Description</h3>
      <textarea
        rows="6"
        placeholder="Paste JD here"
        onChange={(e) => setJobDesc(e.target.value)}
      />
    </div>
  );
}

export default JobDescription;
