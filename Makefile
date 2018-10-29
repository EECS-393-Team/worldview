venv: venv/bin/activate

venv/bin/activate: requirements.txt
	test -e venv/bin/activate || python -m venv venv
	. venv/bin/activate; pip install -Ur requirements.txt
	touch venv/bin/activate

install_hooks: venv
	venv/bin/pre-commit install

.PHONY: test
test: venv
	(. venv/bin/activate; \
		coverage run venv/bin/pytest; \
		coverage report -m --fail-under 100 --omit=venv/*;\
	)

clean:
	rm -rf venv
