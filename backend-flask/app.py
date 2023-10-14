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

@app.route('/prot_found', methods=['POST'])
def prot_found():
    print("testando")

    data = request.get_json()
    search_string = data.get('searchString', '')

    prot_found = search_PDB(search_string)

    return jsonify({'prot_found': prot_found})

@app.route('/process', methods=['POST'])
def process_string():
    print("testando")

    prot_found = True

    data = request.get_json()
    input_string = data.get('inputString', '')
    
    bsites_grasp = grasp_search(input_string)
    bsites_puresnet = puresnet_search(input_string)
    bsites_gass = []
    bsites_deeppocket = deeppocket_search(input_string)
    bsites_pointsite = pointsite_search(input_string)
    bsites_p2rank = p2rank_search(input_string)

    summary_content = build_summary(bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)

    create_download_files(input_string, bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)

    return jsonify({'prot_found': prot_found,
                    'grasp': bsites_grasp,
                    'puresnet': bsites_puresnet,
                    'gass': bsites_gass, 
                    'deeppocket': bsites_deeppocket, 
                    'pointsite': bsites_pointsite,
                    'p2rank': bsites_p2rank,
                    'summary': summary_content})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
