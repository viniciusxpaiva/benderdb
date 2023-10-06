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
    
    bsites_grasp = grasp_search(input_string)
    bsites_puresnet = puresnet_search(input_string)
    bsites_gass = []
    bsites_deeppocket = deeppocket_search(input_string)
    bsites_pointsite = pointsite_search(input_string)
    bsites_p2rank = p2rank_search(input_string)

    summary_content = build_summary(bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)

    #intersection_data = process_intersection_data([bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank], summary_content[2])

    for i in summary_content[2]:
        print(i)

    return jsonify({'grasp': bsites_grasp,
                    'puresnet': bsites_puresnet,
                    'gass': bsites_gass, 
                    'deeppocket': bsites_deeppocket, 
                    'pointsite': bsites_pointsite,
                    'p2rank': bsites_p2rank,
                    'summary': summary_content})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
