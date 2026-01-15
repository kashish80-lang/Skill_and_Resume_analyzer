from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import re

app = Flask(__name__)
CORS(app)

SKILLS_DB = {
    "python": "https://www.learnpython.org/",
    "java": "https://www.javatpoint.com/java-tutorial",
    "c++": "https://www.learncpp.com/",
    "javascript": "https://javascript.info/",
    "react": "https://react.dev/learn",
    "node": "https://nodejs.dev/en/learn/",
    "flask": "https://flask.palletsprojects.com/en/latest/",
    "django": "https://docs.djangoproject.com/en/stable/",
    "sql": "https://www.w3schools.com/sql/",
    "mysql": "https://www.mysqltutorial.org/",
    "mongodb": "https://www.mongodb.com/docs/",
    "machine learning": "https://www.coursera.org/learn/machine-learning",
    "deep learning": "https://www.deeplearning.ai/",
    "nlp": "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/",
    "html": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "css": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "git": "https://git-scm.com/docs/gittutorial"
}

def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.lower()

def extract_skills(text):
    found = set()
    for skill in SKILLS_DB.keys():
        if re.search(rf"\b{skill}\b", text):
            found.add(skill)
    return found

@app.route("/analyze", methods=["POST"])
def analyze():
    resume = request.files.get("resume")
    jd = request.form.get("jd")

    if not resume or not jd:
        return jsonify({"error": "Resume and JD required"}), 400

    resume_text = extract_text_from_pdf(resume)
    jd_text = jd.lower()

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    matched_skills = resume_skills & jd_skills
    missing_skills = jd_skills - resume_skills

    # ✅ Matched Skills Percentage
    if len(jd_skills) > 0:
        match_percentage = round(
            (len(matched_skills) / len(jd_skills)) * 100, 2
        )
    else:
        match_percentage = 0

    missing_with_links = [
        {"skill": s, "link": SKILLS_DB[s]}
        for s in missing_skills
    ]

    return jsonify({
        "matched_skills": list(matched_skills),
        "missing_skills": missing_with_links,
        "match_percentage": match_percentage
    })

if __name__ == "__main__":
    app.run(debug=True)
