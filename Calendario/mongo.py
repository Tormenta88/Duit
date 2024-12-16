from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://torm:1sqDzSrJSRS9pEOp@maximilianodb.oauk3.mongodb.net/")
db = client["calendar_db"]  # Replace with your database name
events_collection = db["events"]  # Replace with your collection name

@app.route("/add_event", methods=["POST"])
def add_event():
    # Retrieve event data from request
    event = request.json  # Assuming JSON data is sent from the frontend
    if event:
        result = events_collection.insert_one(event)
        return jsonify({"status": "success", "event_id": str(result.inserted_id)})
    return jsonify({"status": "failure", "message": "No event data provided"}), 400

@app.route("/get_events", methods=["GET"])
def get_events():
    events = list(events_collection.find({}, {"_id": 0}))  # Exclude MongoDB's _id
    return jsonify(events)

if __name__ == "__main__":
    app.run(debug=True)
