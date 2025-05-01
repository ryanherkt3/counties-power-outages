import requests

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Make API website think I am not a bot
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
}

@app.route('/api/getoutages', methods=['GET'])
def get_outages():
    return requests.get("https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns", headers=headers).json()

if __name__ == '__main__':
    app.run(debug=True, port=8080)