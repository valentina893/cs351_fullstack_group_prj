"""
Database utility functions for PostgreSQL. 
Database is ran locally.

Application will pull in user data for 
login info, and interests.

Code written by Valentina RS
"""

import psycopg2
from psycopg2 import sql, errors

def connect_db():
    return psycopg2.connect(
        host="localhost",
        database="postgres",
# user and password is to be replaced by users postgres username and password
        user="postgres",
        password="pencil#123",
        port=5432
    )

def create_tables():
    conn = connect_db()
    cur = conn.cursor()

    # Create users table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
    """)

    # Create interests table (linked to users)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS interests (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            interest TEXT NOT NULL
        );
    """)

    conn.commit()
    cur.close()
    conn.close()

def add_user(username, password):
    conn = connect_db()
    cur = conn.cursor()

    try:
        cur.execute("SELECT id FROM users WHERE username = %s;", (username,))
        existing = cur.fetchone()

        if existing:
            print(f"User '{username}' already exists. Returning existing ID.")
            return existing[0]  # Return their user_id

        cur.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id;",
            (username, password)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return user_id

    except Exception as e:
        conn.rollback()
        print(f"Error adding user: {e}")
        return None
    finally:
        cur.close()
        conn.close()

def add_interests(user_id, interests):
    """interests: a list of strings"""
    conn = connect_db()
    cur = conn.cursor()
    for interest in interests:
        cur.execute("INSERT INTO interests (user_id, interest) VALUES (%s, %s);", (user_id, interest))
    conn.commit()
    cur.close()
    conn.close()

def get_user_interests(user_id):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT interest FROM interests WHERE user_id = %s;", (user_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [r[0] for r in rows]
