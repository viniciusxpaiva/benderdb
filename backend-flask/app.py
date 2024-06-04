from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import *
from consensus_methods import *

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

@app.route('/prot_folder', methods=['POST'])
def prot_folder():
    data = request.get_json()
    search_string = data.get('searchString', '')

    prot_folder = search_PDB(search_string)

    return jsonify({'prot_folder': prot_folder})

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

    prot_folder = search_PDB(input_string)

    summary_content = build_summary(bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)

    if summary_content[3] > 0:
        create_download_files(input_string, bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)
    else:
        print("No predictions for this protein")

    protein_residues = get_all_protein_residues(input_string, prot_folder)

    mean_consensus_data, max_consensus_percent = mean_consensus(summary_content[2], summary_content[3])

    ai_prediction_data = ai_prediction(input_string, prot_folder)

    prot_full_name = get_protein_full_name(input_string, prot_folder)

    return jsonify({'grasp': bsites_grasp,
                    'puresnet': bsites_puresnet, 
                    'deeppocket': bsites_deeppocket, 
                    'pointsite': bsites_pointsite,
                    'p2rank': bsites_p2rank,
                    'summary': summary_content,
                    'prot_folder': prot_folder,
                    'all_residues': protein_residues,
                    'mean_consensus' : mean_consensus_data,
                    'max_consensus_percent': max_consensus_percent,
                    'ai_prediction' : ai_prediction_data,
                    'prot_full_name': prot_full_name})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)


