from utils import *

BACKEND_PATH = '/home/vinicius/Desktop/benderdb/backend-flask/'
FRONTEND_PATH = '/home/vinicius/Desktop/benderdb/frontend-react/'

def mean_consensus(residues_list, total_pred):
	'''
	Params:
		- bsite_pred_list: list of list. Each inner list is all binding sites of each predictor
	'''
	res_with_occ_list = []

	for bsite in residues_list:
		aux = bsite[0]
		aux.append(len(bsite[1])/total_pred)
		res_with_occ_list.append(aux)
		
	sorted_data = sorted(res_with_occ_list, key=lambda x: (int(x[2]) if x[2].isdigit() else x[2]))
	max_consensus_percent = max([float(inner[-1]) for inner in sorted_data])
	
	return sorted_data, max_consensus_percent

def ai_prediction(prot_name):
	prot_name = prot_name.upper()
	file_path = BACKEND_PATH + 'data/predictions/'
	file_name = 'final_ai_prediction.csv'

	df = pd.read_csv(file_path + file_name)
	matches = df.loc[df['residue'].str.contains(prot_name), 'residue']

	if matches.empty:
		return []

	matches_list = matches.to_string(index=False).replace(' ','').split('\n')
	matches_list = [element.split('_')[1:] for element in matches_list]
	matches_list = [[item[2], item[0], item[1]] for item in matches_list]

	return matches_list