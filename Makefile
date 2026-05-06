.PHONY: install build wasm dev deploy clean

# Install the blake CLI globally (cargo install to ~/.cargo/bin)
install:
	cargo install --path blake-cli

# Build the CLI binary without installing (output: target/release/blake)
build:
	cargo build -p blake --release

# Build the WASM package for the React frontend
wasm:
	wasm-pack build blake-wasm --target bundler --out-dir ../wasm-pkg

# Start the local dev server (requires wasm-pkg — run `make wasm` first)
dev:
	npm install
	npm start

# Full production build: WASM + React bundle
bundle: wasm
	npm install
	npm run build

# Deploy to GitHub Pages (builds first via predeploy hook)
deploy: wasm
	npm run deploy

# Remove build artifacts
clean:
	cargo clean
	rm -rf wasm-pkg dist
