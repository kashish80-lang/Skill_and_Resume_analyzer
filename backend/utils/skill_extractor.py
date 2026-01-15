def extract_skills(text):
skills_db = [
"python", "java", "c++", "machine learning", "deep learning",
"nlp", "react", "node", "flask", "django",
"sql", "mongodb", "pytorch", "tensorflow"
]


text = text.lower()
found = []
for skill in skills_db:
if skill in text:
found.append(skill)
return list(set(found))