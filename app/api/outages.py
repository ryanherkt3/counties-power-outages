# python app/api/outages.py in console to run

import requests

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# /api/getoutages
@app.route('/api/getoutages', methods=['GET'])
def get_outages():
    return requests.get("https://app.countiespower.com/api/v300/outages/range/current").json()

if __name__ == '__main__':
    app.run(debug=True, port=8080)
