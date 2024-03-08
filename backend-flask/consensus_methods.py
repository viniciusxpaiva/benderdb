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

	print(res_with_occ_list)
	return res_with_occ_list
