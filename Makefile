.PHONY: deps
deps:
	@mix deps.get
	npm install --prefix assets

.PHONY: setup
setup: deps
	@mix ecto.setup

.PHONY: run
run:
	tmux new-session -d -s laibrary -n dev \;\
		send-keys './scripts/dev.sh' C-m \;\
		attach-session -t laibrary

.PHONY: test
test:
	@mix test

.PHONY: clean_mix
clean:
	@mix deps.clean --all
	@mix deps.get
	@mix compile --force
