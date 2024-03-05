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

@app.route('/prot_folder', methods=['POST'])
def prot_folder():
    data = request.get_json()
    search_string = data.get('searchString', '')

    prot_folder = search_PDB(search_string)

    print('protfolder+', search_string, prot_folder)

    return jsonify({'prot_folder': prot_folder})

@app.route('/process', methods=['POST'])
def process_string():
    data = request.get_json()
    input_string = data.get('inputString', '')
    
    bsites_grasp = grasp_search(input_string)
    print(bsites_grasp)
    bsites_puresnet = puresnet_search(input_string)
    bsites_gass = []
    bsites_deeppocket = deeppocket_search(input_string)
    bsites_pointsite = pointsite_search(input_string)
    bsites_p2rank = p2rank_search(input_string)

    prot_folder = search_PDB(input_string)

    summary_content = build_summary(bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)

    print(summary_content)

    create_download_files(input_string, bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank)

    protein_residues = get_all_protein_residues(input_string, prot_folder)

    return jsonify({'grasp': bsites_grasp,
                    'puresnet': bsites_puresnet,
                    'gass': bsites_gass, 
                    'deeppocket': bsites_deeppocket, 
                    'pointsite': bsites_pointsite,
                    'p2rank': bsites_p2rank,
                    'summary': summary_content,
                    'prot_folder': prot_folder,
                    'all_residues': protein_residues})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)


