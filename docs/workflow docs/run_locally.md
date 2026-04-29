# 🚀 Run the Project Locally – Frontend + Python Backend

This guide shows you how to get the project running on your own computer.

The project has two main parts:

- **Frontend** → runs with `npm`
- **Backend** → runs with Python

You will usually need **two terminal windows open**:

1. One terminal for the frontend
2. One terminal for the backend

---

## ✅ Before You Start

Make sure you have installed:

- Node.js
- Python 3
- VS Code
- Git / GitHub Desktop

---

# 📁 1. Open the Project

Open the project folder in **VS Code**.

Then open the terminal in VS Code:

    Terminal → New Terminal

Make sure you are inside the main project folder.

---

# 🖥️ 2. Start the Frontend

The frontend uses `npm`.

In your first terminal, run:

    npm install

This installs the frontend packages.

Then run:

    npm run dev

If it works, you should see a local link like:

    http://localhost:5173

or:

    http://localhost:3000

Open that link in your browser.

✅ Your frontend should now be live.

---

# 🐍 3. Start the Python Backend

Open a second terminal.

Make sure you are still inside the project folder.

---

## Mac / zsh

Create a virtual environment:

    python3 -m venv venv

Activate it:

    source venv/bin/activate

Install backend requirements:

    pip install -r backend/requirements.txt

Start the backend:

    python backend/app.py

or if the project uses Flask:

    flask --app backend/app run

---

## Windows

Create a virtual environment:

    python -m venv venv

Activate it:

    venv\Scripts\activate

Install backend requirements:

    pip install -r backend/requirements.txt

Start the backend:

    python backend/app.py

or if the project uses Flask:

    flask --app backend/app run

---

# ✅ 4. Check Everything Is Running

You should have:

## Terminal 1

Frontend running:

    npm run dev

## Terminal 2

Backend running:

    python backend/app.py

or:

    flask --app backend/app run

---

# 🌐 5. Open the App

Open the frontend link in your browser.

Example:

    http://localhost:5173

The frontend should connect to the Python backend.

---

# 🧯 Common Issues

---

## Issue 1: `npm: command not found`

This means Node.js is probably not installed.

Fix:
- Install Node.js
- Close and reopen VS Code
- Try again:

    npm install

---

## Issue 2: `python: command not found`

On Mac, use:

    python3

instead of:

    python

Example:

    python3 -m venv venv

---

## Issue 3: Backend requirements file not found

If this does not work:

    pip install -r backend/requirements.txt

Check that:
- You are inside the correct project folder
- The `backend` folder exists
- The `requirements.txt` file exists inside `backend`

---

## Issue 4: Frontend runs but backend does not

Check:
- Is your virtual environment active?
- Did you install backend requirements?
- Are you running the correct backend command?

---

## Issue 5: Port already in use

If you see a message about a port already being used, you may already have the project running.

Try:
- Stop the old terminal process with `Ctrl + C`
- Run the command again

---

# 🛑 How To Stop the Project

In each terminal, press:

    Ctrl + C

This stops the running server.

---

# 🧠 Important Notes

## Frontend

The frontend is what you see in the browser.

It usually runs with:

    npm run dev

---

## Backend

The backend handles Python logic and data.

It usually runs with:

    python backend/app.py

or:

    flask --app backend/app run

---

# ✅ Quick Start Commands

## Terminal 1 – Frontend

    npm install
    npm run dev

---

## Terminal 2 – Backend on Mac / zsh

    python3 -m venv venv
    source venv/bin/activate
    pip install -r backend/requirements.txt
    python backend/app.py

---

## Terminal 2 – Backend on Windows

    python -m venv venv
    venv\Scripts\activate
    pip install -r backend/requirements.txt
    python backend/app.py

---

# 🚀 Final Goal

By the end, you should have:

- Frontend running in the browser
- Python backend running in a second terminal
- Both parts of the project live on your computer
