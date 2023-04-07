install: 
	npm ci

publish: 
	npm publish --dry-run

make lint: 
	npx eslint .

make lint-fix:
	npx eslint . --fix