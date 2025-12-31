import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_score(user_skills, job_skills):
    user_set = set(user_skills)
    job_set = set(job_skills)

    # 1️⃣ Exact overlap score
    overlap_ratio = len(user_set & job_set) / len(job_set)

    # 2️⃣ Semantic score (TF-IDF)
    user_text = " ".join(user_skills)
    job_text = " ".join(job_skills)

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([user_text, job_text])
    semantic_score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]

    # 3️⃣ Final hybrid score
    final_score = (0.6 * overlap_ratio) + (0.4 * semantic_score)

    return round(final_score * 100, 2)

if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    score = calculate_score(data["user_skills"], data["job_skills"])
    print(score)
