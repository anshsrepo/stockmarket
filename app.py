from flask import Flask, jsonify
from pymongo import MongoClient
import pandas as pd
import os

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["stock_market"]
collection = db["stocks"]

# Load CSV data and insert into MongoDB
def load_csv_to_mongo():
    for root, dirs, files in os.walk(os.getcwd()):
        for file in files:
            if file.endswith(".csv"):
                try:
                    df = pd.read_csv(os.path.join(root, file))
                    records = df.to_dict(orient="records")
                    for record in records:
                        if record.get("symbol"):  # Avoid duplicates
                            collection.update_one(
                                {"symbol": record["symbol"]},
                                {"$set": record},
                                upsert=True
                            )
                    print(f"✅ Loaded: {file}")
                except Exception as e:
                    print(f"❌ Error loading {file}: {e}")

@app.route('/stocks', methods=['GET'])
def get_all_stocks():
    data = list(collection.find({}, {"_id": 0}))
    return jsonify(data)

@app.route('/stocks/<string:symbol>', methods=['GET'])
def get_stock(symbol):
    stock = collection.find_one({"symbol": symbol.upper()}, {"_id": 0})
    if stock:
        return jsonify(stock)
    return jsonify({"error": "Stock not found"}), 404

if __name__ == '__main__':
    load_csv_to_mongo()
    app.run(debug=True, host='0.0.0.0', port=5000)

