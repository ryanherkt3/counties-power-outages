import requests

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/api/getoutages', methods=['GET'])
def get_outages():
    return requests.get("https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns").json()

if __name__ == '__main__':
    app.run(debug=True, port=8080)