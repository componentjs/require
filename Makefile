build: test

node_modules: package.json
	@npm install

test: node_modules
	@./node_modules/.bin/mocha \
		--timeout 300 \
		--require should \
		--bail \
		--reporter spec

.PHONY: test