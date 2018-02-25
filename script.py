import json
import re
result = {}
for one in range(97,123):
	letter = chr(one)
	with open("eng.dic") as file: 		
		raws = []
		for line in file:
			line = line.lower()
			if line.startswith(letter):
				raws.append(re.sub('(\r|\n)', '', line))
		result[letter] = raws[:]
		raws = []

with open("data.json", "w") as f: 
	f.write(json.dumps(result))