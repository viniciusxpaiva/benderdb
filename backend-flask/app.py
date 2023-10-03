from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import *

app = Flask(__name__)
CORS(app)

# Route for serving React app

# Route for API data
@app.route('/data1')
def get_time():
    return {
        'Name': "geek",
        "Age": "25",
        "Date": "some date",
        "programming": "python"
    }

@app.route('/process', methods=['POST'])
def process_string():
    data = request.get_json()
    input_string = data.get('inputString', '')
    
    bsites_deeppocket = deeppocket_search(input_string)
    bsites_grasp = grasp_search(input_string)
    bsites_pointsite = pointsite_search(input_string)
    bsites_p2rank = p2rank_search(input_string)
    bsites_gass = []

    return jsonify({'grasp': bsites_grasp, 
                    'deeppocket': bsites_deeppocket, 
                    'pointsite': bsites_pointsite,
                    'p2rank': bsites_p2rank,
                    'gass': bsites_gass})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
