# Skill and Resume Analyzer

A web application that analyzes a candidate's resume against a job description and provides a **skill match percentage**, highlighting missing or extra skills. Built using **React** (frontend) and **Flask** (backend).

---

## Features

- Upload resumes in **PDF** format.  
- Upload or input **Job Description (JD)**.  
- Automatically extract skills from both JD and resume.  
- Calculate **percentage match** of skills.  
- Highlight **missing skills** that the candidate should focus on.  
- Display results in a clean and interactive UI.

---

## Tech Stack

- **Frontend:** React, HTML5, CSS3, JavaScript  
- **Backend:** Flask, Python  
- **Libraries:** pdfjs-dist (for PDF parsing), pandas, nltk, spacy (for skill extraction)  
- **Others:** REST API communication between frontend and backend  

---

## Project Structure

Skill_and_Resume_analyzer/

├── frontend/ # React frontend

│ ├── src/

│ ├── package.json

│ └── public/

├── backend/ # Flask backend

│ ├── app.py

│ ├── requirements.txt

│ └── utils.py # helper functions for skill extraction

├── uploads/ # folder to store uploaded resumes

└── README.md

---

## Installation

### Backend

1. Navigate to backend folder:
cd backend

2. Create a virtual environment:
     python -m venv venv

3. Activate the environment:

Windows:
venv\Scripts\activate

4. Install dependencies:

pip install -r requirements.txt

5. Run Flask server:

python app.py

### Frontend

1. Navigate to frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Start React development server:

npm start
App will run on http://localhost:3000/

 ### Usage

1. Open the frontend URL in browser.
2. Upload your resume (PDF).
3. Paste or upload the job description.
4. Click Analyze.
5. View the skill match percentage and missing skills.

### Future Enhancements

1. Add resume parsing for multiple formats (Word, TXT).
2. Highlight keywords in the resume.
3. Add AI-powered suggestions to improve resume.
4. Support multiple resumes comparison at once.

```bash
