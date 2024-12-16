from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://torm:1sqDzSrJSRS9pEOp@maximilianodb.oauk3.mongodb.net/")
db = client["calendar_db"]
users_collection = db["users"]  # Collection to store user credentials

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    if not email or not password or not name:
        return jsonify({"status": "failure", "message": "Missing fields"}), 400

    # Check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"status": "failure", "message": "Email already registered"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Insert user into the `users` collection
    user_id = users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    }).inserted_id

    # Create a user-specific collection
    db[f"user_{user_id}"].insert_one({"info": "User-specific collection initialized"})

    return jsonify({"status": "success", "message": "User registered successfully"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"status": "failure", "message": "Missing fields"}), 400

    # Fetch the user from the `users` collection
    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"status": "failure", "message": "Invalid email or password"}), 401

    return jsonify({"status": "success", "message": "Logged in successfully", "user_id": str(user["_id"])})

@app.route("/user/<user_id>/add_event", methods=["POST"])
def add_event(user_id):
    collection_name = f"user_{user_id}"
    user_collection = db[collection_name]

    event = request.json
    if not event:
        return jsonify({"status": "failure", "message": "No event data provided"}), 400

    result = user_collection.insert_one(event)
    return jsonify({"status": "success", "event_id": str(result.inserted_id)})

@app.route("/user/<user_id>/get_events", methods=["GET"])
def get_events(user_id):
    collection_name = f"user_{user_id}"
    user_collection = db[collection_name]

    events = list(user_collection.find({}, {"_id": 0}))
    return jsonify(events)

if __name__ == "__main__":
    app.run(debug=True)
