recipes:
	./bin/compile

all: recipes css js

assets: css js

css:
	./bin/compile css

js:
	./bin/compile js

clean:
	./bin/compile clean
