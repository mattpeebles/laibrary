.PHONY: deps
deps:
	@mix deps.get

.PHONY: setup
setup: deps
	@mix ecto.setup

.PHONY: run
run:
	@mix phx.server

.PHONY: test
test:
	@mix test
