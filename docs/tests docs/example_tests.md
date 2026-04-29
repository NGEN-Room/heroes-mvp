# 🧪 Example Tests – Hero Project

This guide shows simple examples of tests you can run for your hero.

These tests check that your hero is valid and will work in the system.

---

# 🧠 What Is a Test?

A test is a small piece of code that checks something is true.

Example:

    assert 1 == 1

If the condition is true → test passes  
If false → test fails  

---

# 📁 Example Project Structure

    heroes/
        rangi.py

    tests/
        test_rangi.py

---

# 🦸 Example Hero File

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

# 🧪 Example Test File

Create a file:

    tests/test_rangi.py

---

## Import Your Hero

    from heroes.rangi import hero

---

## ✅ Test 1 – Hero Has a Name

    def test_hero_has_name():
        assert hero["name"] != ""

---

## ✅ Test 2 – Required Keys Exist

    def test_required_keys():
        required = ["name", "class", "hp", "max_hp", "mp", "ap", "actions"]
        for key in required:
            assert key in hero

---

## ✅ Test 3 – HP Is Valid

    def test_hp_valid():
        assert hero["hp"] > 0
        assert hero["hp"] <= hero["max_hp"]

---

## ✅ Test 4 – MP and AP Are Valid

    def test_stats_valid():
        assert hero["mp"] >= 0
        assert hero["ap"] >= 0

---

## ✅ Test 5 – Has Actions

    def test_has_actions():
        assert len(hero["actions"]) > 0

---

# ▶️ Running These Tests

Make sure your virtual environment is active:

    source venv/bin/activate

Then run:

    python -m pytest

---

# 📖 What You Will See

If tests pass:

    5 passed

If something is wrong:

    1 failed

Read the error message to see what needs fixing.

---

# ❌ Example Failure

    AssertionError: assert 0 > 0

This means your HP is 0 → fix your hero:

    "hp": 100

---

# 🧠 Tip

Run tests often while building.

Don’t wait until the end.

---

# 🚀 Goal

Make your hero pass all tests.

If your tests pass, your hero is ready for the game system.
