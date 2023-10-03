import pandas as pd
import itertools

def format_bsite_string(bsite_string):
	items = bsite_string.split(',')
	processed_result = [item.split('_') for item in items]
	return processed_result


def count_common_residues(total_res, unique_total_res):
	len_list = [0] * len(unique_total_res)
	
	for i in range(0, len(unique_total_res)):
		for j in range(0, len(total_res)):
			if unique_total_res[i] == total_res[j]:
				len_list[i] += 1

	unique_with_count = unique_total_res
	for i in range(0, len(len_list)):
		unique_with_count[i].append(len_list[i])

	sorted_unique_with_count = sorted(unique_with_count, key=lambda x: x[-1], reverse=True)

	return sorted_unique_with_count


def build_summary(bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank):
	
	total_res = [] # List of all residues, not grouped by binding site or predictor
	unique_total_res = [] # List of unique residues from all binding sites, not grouped by binding site or predictor
	total_sites = [] # List of all binding sites, not grouped by predictor
	total_sites.extend([bsites_grasp, bsites_puresnet, bsites_gass, bsites_deeppocket, bsites_pointsite, bsites_p2rank])
	
	num_total_sites = 0
	num_total_res = 0

	
	for pred_sites in total_sites:
		num_total_sites += len(pred_sites)
		for site in pred_sites:
			num_total_res += len(site)
			for res in site:
				total_res.append(res)

	
	
	for elem in total_res:
	    if elem not in unique_total_res:
	        unique_total_res.append(elem)
	num_unique_res = len(unique_total_res)

	print('len total res:', num_total_res)
	print('len unique total res:', len(unique_total_res))
	
	print(num_total_sites, num_unique_res)
	sorted_unique_with_count = count_common_residues(total_res, unique_total_res)

	print(sorted_unique_with_count)
	# Return list format: [num_total_sites, num_unique_res, [list of most common residues]]









def grasp_search(prot_name):
	'''
	Function to handle search for GRaSP results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/grasp/'
	file_name = 'GRaSP_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

	pd.set_option('display.max_colwidth', None)

	matches_list = matches.to_string(index=False).split('\n')

	if matches_list[0] == 'Series([], )':
		matches_list = []

	result_list = []
	
	for blist in matches_list:
		result_list.append(format_bsite_string(blist))
	
	return result_list


def puresnet_search(prot_name):
	'''
	Function to handle search for PUResNet results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/puresnet/'
	file_name = 'PUResNet_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

	pd.set_option('display.max_colwidth', None)

	matches_list = matches.to_string(index=False).split('\n')

	if matches_list[0] == 'Series([], )':
		matches_list = []

	result_list = []
	
	for blist in matches_list:
		result_list.append(format_bsite_string(blist))
	
	return result_list


def p2rank_search(prot_name):
	'''
	Function to handle search for p2Rank results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/p2rank/'
	file_name = 'p2Rank_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

	pd.set_option('display.max_colwidth', None)

	matches_list = matches.to_string(index=False).split('\n')

	if matches_list[0] == 'Series([], )':
		matches_list = []

	result_list = []

	for blist in matches_list:
		result_list.append(format_bsite_string(blist))

	return result_list

def pointsite_search(prot_name):
	'''
	Function to handle search for PointSite results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/pointsite/'
	file_name = 'PointSite_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

	pd.set_option('display.max_colwidth', None)

	matches_list = matches.to_string(index=False).split('\n')


	if matches_list[0] == 'Series([], )':
		matches_list = []

	result_list = []
	
	for blist in matches_list:
		result_list.append(format_bsite_string(blist))

	return result_list

def deeppocket_search(prot_name):
	'''
	Function to handle search for DeepPocket results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/deeppocket/'
	file_name = 'DeepPocket_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

	pd.set_option('display.max_colwidth', None)

	matches_list = matches.to_string(index=False).replace(' ','').split('\n')

	pd.set_option('display.max_colwidth', None)

	if matches_list[0] == 'Series([],)':
		matches_list = []

	result_list = []
	
	for blist in matches_list:
		result_list.append(format_bsite_string(blist))
	
	return result_list

#grasp_search('X8F8R7')
#p2rank_search('X8F8R7')
#pointsite_search('X8F8R7')