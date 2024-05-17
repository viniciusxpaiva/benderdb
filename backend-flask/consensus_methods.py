from utils import *

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
	return sorted_data

def ai_prediction(prot_name):
	prot_name = prot_name.upper()
	file_path = 'data/predictions/'
	file_name = 'final_ai_prediction.csv'

	df = pd.read_csv(file_path + file_name)
	matches = df.loc[df['residue'].str.contains(prot_name), 'residue']

	if matches.empty:
		return []

	matches_list = matches.to_string(index=False).replace(' ','').split('\n')
	matches_list = [element.split('_')[1:] for element in matches_list]
	matches_list = [[item[2], item[0], item[1]] for item in matches_list]

	return matches_list


def deeppocket_search(prot_name):
	'''
	Function to handle search for DeepPocket results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/deeppocket/'
	file_name = 'DeepPocket_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)
	pd.set_option('display.max_colwidth', None)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

	if matches.empty:
		return []

	matches_list = matches.to_string(index=False).replace(' ','').split('\n')

	result_list = []
	
	for blist in matches_list:
		result_list.append(format_bsite_string(blist))
	
	return result_list