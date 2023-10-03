import pandas as pd

# seu codigo python

def format_bsite_string(bsite_string):
	items = bsite_string.split(',')
	processed_result = [item.split('_') for item in items]
	return processed_result


def grasp_search(prot_name):
	'''
	Function to handle search for GRaSP results
	'''
	prot_name = prot_name.upper()
	file_path = 'data/grasp/'
	file_name = 'GRaSP_Concatenated_Sites.csv'

	df = pd.read_csv(file_path + file_name)

	matches = df.loc[df['Protein'].str.contains(prot_name), 'Binding_Site']

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

	print(matches_list[0])

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


	if matches_list[0] == 'Series([],)':
		matches_list = []

	result_list = []
	
	for blist in matches_list:
		result_list.append(format_bsite_string(blist))
	
	return result_list

#grasp_search('X8F8R7')
#p2rank_search('X8F8R7')
#pointsite_search('X8F8R7')