
test:
	@./node_modules/.bin/mocha \
		--timeout 300 \
		--require should \
		--reporter spec

.PHONY: test