"""
Main backend script for application.

Code written by Valentina RS
"""

"""
Main backend script for application.

Code written by Valentina RS
"""
from flask_cors import CORS
from flask_cors import cross_origin


from flask import (
    Flask, request, jsonify, session
)

# -----------------------
# DATABASE FUNCTIONS
# -----------------------
from database import (
    create_tables, add_user, get_user_interests,
    add_interests, connect_db
)

# -----------------------
# SEARCH FUNCTIONS
# -----------------------
import json
# from ddgs import DDGS
from ddgs import DDGS


# ---------------------------------------
# WRAPPER FUNCTION FROM search.py
# ---------------------------------------
def ddg_general_search(query, max_results=5):
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=max_results):
            results.append({
                "title": r["title"],
                "url": r["href"],
                "snippet": r["body"]
            })
    return results  # Return Python list, not JSON string (Flask will jsonify it)


# ---------------------------------------
# FLASK SETUP
# ---------------------------------------
app = Flask(__name__)
app.secret_key = "your-secret-key"  # change for production
# CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "OPTIONS"]
)





app.config.update(
    SESSION_COOKIE_SAMESITE=None,  # allow cross-site
    SESSION_COOKIE_SECURE=False,   # HTTP localhost
    SESSION_COOKIE_HTTPONLY=True
    
)




# Create tables on startup
create_tables()


# ---------------------------------------
# DB HELPER: GET USER BY USERNAME
# ---------------------------------------
def get_user(username):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT id, username, password FROM users WHERE username = %s;", (username,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if row:
        return {"id": row[0], "username": row[1], "password": row[2]}
    return None


# ---------------------------------------
# HOME ROUTE
# ---------------------------------------
@app.get("/")
def home():
    return jsonify({"message": "Backend running", "logged_in": "user_id" in session})


# ---------------------------------------
# REGISTER
# ---------------------------------------
@app.post("/register")
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    user_id = add_user(username, password)
    if user_id is None:
        return jsonify({"error": "User could not be created"}), 400
    
    session["user_id"] = user_id
    session["username"] = username

    return jsonify({"message": "User created", "user_id": user_id})


# ---------------------------------------
# LOGIN
# ---------------------------------------
@app.post("/login")
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = get_user(username)

    if not user or user["password"] != password:
        return jsonify({"error": "Invalid username or password"}), 401

    # Set session token
    session["user_id"] = user["id"]
    session["username"] = user["username"]

    return jsonify({"message": "Logged in", "user_id": user["id"]})


# ---------------------------------------
# LOGOUT
# ---------------------------------------
@app.get("/logout")
def logout():
    session.clear()
    return jsonify({"message": "Logged out"})


# ---------------------------------------
# ADD INTERESTS
# ---------------------------------------
@app.post("/add_interests")
def add_user_interests():
    print("DEBUG: POST /add_interests hit!")
    if "user_id" not in session:
        return jsonify({"error": "Not logged in"}), 401

    print("DEBUG: POST /add_interests hit!")
    data = request.json
    interests = data.get("interests")

    if not interests or not isinstance(interests, list):
        return jsonify({"error": "Interests must be a list"}), 400

    add_interests(session["user_id"], interests)
    print("Received interests: ", interests)

    return jsonify({"message": "Interests added"})


# ---------------------------------------
# GET INTERESTS
# ---------------------------------------
@app.get("/interests")
def get_user_interests_route():
    print("DEBUG: GET /interests hit!")
    print("Raw cookie:", request.cookies.get("session"))
    print("Session data: ", dict(session))
    if "user_id" not in session:
        return jsonify({"error": "Not logged in"}), 401

    interests = get_user_interests(session["user_id"])

    return jsonify({
        "username": session["username"],
        "interests": interests
    }), 200


# ---------------------------------------
# DUCKDUCKGO SEARCH ROUTE
# ---------------------------------------
# ---------------------------------------
# DUCKDUCKGO SEARCH ROUTE (PUBLIC)
# ---------------------------------------
@app.get("/search")
def search():
    """
    Public search endpoint.
    Example: /search?query=python&max_results=3
    Does NOT require login or cookies.
    """
    query = request.args.get('query')
    max_results = request.args.get('max_results', 5)

    try:
        max_results = int(max_results)
    except ValueError:
        return jsonify({"error": "max_results must be an integer"}), 400

    if not query:
        return jsonify({"error": "Missing query parameter"}), 400

    results = ddg_general_search(query, max_results)

    return jsonify({
        "query": query,
        "results": results
    })


# ---------------------------------------
# RUN APPLICATION
# ---------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
    

