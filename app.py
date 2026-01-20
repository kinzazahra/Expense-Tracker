from flask import Flask, render_template, request, redirect, session, jsonify
import sqlite3

app = Flask(__name__)
app.secret_key = "supersecretkey"

def db():
    return sqlite3.connect("expense.db", check_same_thread=False)

# ---------- DB SETUP ----------
with db() as con:
    con.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    """)
    con.execute("""
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        category TEXT,
        amount REAL,
        month TEXT,
        type TEXT
    )
    """)

# ---------- AUTH ----------
@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == "POST":
        u = request.form["username"]
        p = request.form["password"]

        try:
            with db() as con:
                con.execute(
                    "INSERT INTO users (username,password) VALUES (?,?)",
                    (u,p)
                )
            return redirect("/")
        except:
            return "Username already exists"

    return render_template("register.html")

@app.route("/", methods=["GET","POST"])
def login():
    if request.method == "POST":
        u = request.form["username"]
        p = request.form["password"]

        with db() as con:
            user = con.execute(
                "SELECT id FROM users WHERE username=? AND password=?",
                (u,p)
            ).fetchone()

        if user:
            session["user_id"] = user[0]
            return redirect("/dashboard")

        return "Invalid credentials"

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

# ---------- DASHBOARD ----------
@app.route("/dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect("/")
    return render_template("dashboard.html")

# ---------- API ----------
@app.route("/add", methods=["POST"])
def add():
    if "user_id" not in session:
        return jsonify(error="Unauthorized"), 401

    data = request.json

    if not data["month"]:
        return jsonify(error="Month required"), 400

    with db() as con:
        con.execute("""
        INSERT INTO expenses (user_id,title,category,amount,month,type)
        VALUES (?,?,?,?,?,?)
        """, (
            session["user_id"],
            data["title"],
            data["category"],
            data["amount"],
            data["month"],
            data["type"]
        ))

    return jsonify(success=True)

@app.route("/data")
def data():
    if "user_id" not in session:
        return jsonify([])

    month = request.args.get("month")

    with db() as con:
        rows = con.execute("""
        SELECT title,category,amount,type FROM expenses
        WHERE user_id=? AND month=?
        """, (session["user_id"], month)).fetchall()

    return jsonify([
        {"title":r[0], "category":r[1], "amount":r[2], "type":r[3]}
        for r in rows
    ])

if __name__ == "__main__":
    app.run(debug=True)
