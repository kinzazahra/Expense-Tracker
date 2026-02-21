Personal Expense Tracker
A modern, interactive web application designed to help you take control of your personal finances. This application allows users to securely log in, track daily expenses, categorize spending, and visualize their financial habits through dynamic charts.

Built with efficiency and style by Kinza Zahra 💸

Features
Secure User Authentication:

Registration and login functionality using secure session management.

Password hashing to ensure user data privacy (via Werkzeug).

Expense Management:

Add Expenses: Easily log new transactions with a description, amount, and category (e.g., Food, Transport, Entertainment).

Delete Records: Remove accidental or outdated expense entries with a single click.

Total Calculation: Automatically calculates and displays your total spending in real-time.

Visual Analytics:

Integrated Chart.js to generate interactive Pie/Doughnut charts, giving you a clear visual breakdown of where your money is going based on categories.

Modern User Interface:

A sleek, responsive design featuring modern color palettes (#6366f1 Indigo, #10b981 Emerald) and smooth hover effects.

Clean layout separating the input form, expense list, and chart analytics for optimal user experience.

🛠 Tech Stack
Frontend: HTML5, CSS3 (Modern Variables & Flexbox/Grid), Vanilla JavaScript.

Data Visualization: Chart.js (via CDN).

Backend: Python (Flask Framework).

Database: SQLite (Lightweight, serverless relational database).

📂 Project Structure
Plaintext
Expense-Tracker/
│
├── app.py                  # Main Flask application and routing logic
├── expense.db              # SQLite database storing users and expenses
│
├── static/                 # Static assets
│   ├── style.css           # Modern UI styling and color variables
│   └── script.js           # Chart rendering and DOM manipulation
│
└── templates/              # HTML views (Jinja2)
    ├── login.html          # User login page
    ├── register.html       # Account creation page
    └── dashboard.html      # Main interface for tracking and analytics
⚙️ Installation & Setup
Clone the Repository:

Bash
git clone <your-repo-url>
cd Expense-Tracker
Install Dependencies:
Ensure you have Python installed, then install Flask and Werkzeug:

Bash
pip install Flask Werkzeug
Initialize the Database:
The app uses SQLite. On the first run, the database (expense.db) and its tables (users, expenses) will be automatically created or connected.

Run the Application:

Bash
python app.py
Open your browser and navigate to http://127.0.0.1:5000 to start tracking your expenses!

🚀 How to Use
Create an Account: Navigate to the Register page to set up your profile.

Log In: Enter your credentials to access your personal dashboard.

Track Spending: Use the input form to add the details of your latest purchase.

Analyze: Watch the dynamic chart update instantly to reflect your spending across different categories.

🔮 Future Improvements
Option to export expense data as CSV or PDF.

Monthly or weekly budgeting goals with visual progress bars.

Dark mode toggle for the dashboard interface.

Made with ❤️ by Kinza Zahra
