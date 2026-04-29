# 🧪 Testing Guide – Hero Project

This guide explains how to run tests for the project.

Testing helps us check that our code works properly before we commit or push it.

---

## ✅ What This Guide Covers

You will learn how to:

- Activate your Python environment
- Install testing tools
- Run tests
- Understand test results
- Fix common testing issues

---

# 🧠 What Are Tests?

Tests are automatic checks that make sure your code works.

Instead of saying:

    I think my hero works

We can say:

    I ran the tests, and they passed

That is what developers do.

---

# 🎮 Why Are We Testing Heroes?

In this project, tests can check things like:

- Does the hero file exist?
- Does the hero have a name?
- Does the hero have health?
- Does the hero have valid stats?
- Does the hero have actions?
- Can the hero be imported without breaking?

Testing helps prove that your hero can work inside the game system.

---

# ✅ Before Running Tests

Make sure:

- You have opened the project in VS Code
- You are inside the main project folder
- Your Python backend environment is set up
- Your virtual environment is activated

---

# 🐍 1. Activate Your Virtual Environment

## Mac / zsh

    source venv/bin/activate

## Windows

    venv\Scripts\activate

If it worked, you should see:

    (venv)

at the start of your terminal line.

---

# 📦 2. Install Requirements

Run:

    pip install -r backend/requirements.txt

This installs the Python packages needed for the backend.

---

# 🧪 3. Install Pytest

If pytest is not already installed, run:

    pip install pytest

You can check it installed with:

    pip list

Look for:

    pytest

---

# ▶️ 4. Run Tests

Try:

    pytest

If that does not work, use:

    python -m pytest

On Mac, if needed:

    python3 -m pytest

---

# ✅ Recommended Test Command Flow

## Mac / zsh

    source venv/bin/activate
    pip install -r backend/requirements.txt
    pip install pytest
    python -m pytest

## Windows

    venv\Scripts\activate
    pip install -r backend/requirements.txt
    pip install pytest
    python -m pytest

---

# 📖 Understanding Test Results

When tests run, you may see something like:

    5 passed

That means the tests worked.

You may also see:

    1 failed

That means one test found a problem.

This is not bad.

A failed test tells you what to fix.

---

# ❌ Common Test Problems

---

## Problem 1: `pytest: command not found`

This means pytest is probably not installed.

Fix:

    pip install pytest

Then run:

    python -m pytest

---

## Problem 2: `ModuleNotFoundError`

This means Python cannot find a file or module.

Check:

- Are you in the correct project folder?
- Is the file name correct?
- Is the folder name correct?
- Did you spell the import correctly?

---

## Problem 3: Test says a key is missing

Example:

    AssertionError: missing key: health

This means your hero dictionary is missing required data.

Check your hero file has all required keys.

Example:

    hero = {
        "name": "Rangi",
        "class": "Warrior",
        "hp": 100,
        "max_hp": 100,
        "mp": 20,
        "ap": 10,
        "actions": ["attack", "block"]
    }

---

## Problem 4: Test says a stat is invalid

Example:

    hp must be greater than 0

Check your numbers.

Good example:

    "hp": 100

Bad example:

    "hp": 0

---

## Problem 5: Import Error

If your test cannot import your hero, check:

- File name has no spaces
- File name ends with `.py`
- You saved the file
- The hero variable is named correctly
- Your folder structure matches the project

---

# 🦸 Example Hero Structure

Your hero might look like this:

    hero = {
        "name": "Rangi",
        "class": "Warrior",
        "hp": 100,
        "max_hp": 100,
        "mp": 20,
        "ap": 10,
        "actions": ["attack", "block"]
    }

---

# 🧪 Example Test

A test might look like this:

    def test_hero_has_name():
        assert hero["name"] != ""

This checks that the hero has a name.

---

# 🧠 Important Testing Mindset

Tests are not there to make you feel bad.

Tests are there to help you find problems faster.

A failed test is feedback.

---

# ✅ Before You Submit

Before committing and pushing your work, run:

    python -m pytest

Then check:

- [ ] Did the tests run?
- [ ] Did the tests pass?
- [ ] If they failed, did you read the error?
- [ ] Did you fix the issue?
- [ ] Did you run the tests again?

---

# 🚀 Final Goal

Your goal is not just to write code.

Your goal is to prove your code works.

If your hero passes the tests, it is much more likely to work in the game.
