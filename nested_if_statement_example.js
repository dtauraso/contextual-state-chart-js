/*

start_of_if -> [start_of_if, end_of_if]
	'if () {'
	if see {, curly_brackets += 1

end_of_if -> [start_of_if, end_of_if, end]
	'}'
	if see }, curly_brackets -= 1

end -> []

	if curly_brackets == 0
		return valid
	if curly_brackets > 0
		return right deficit
	if curly_brackets < 0
		return left deficit
if(){ if() {} if() {}} curly_brackets == 0

if(){ if() {} if() {} if() { } curly_brackets == 1


*/