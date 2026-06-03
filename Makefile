.PHONY: dev deploy clean

# Start the local dev server (requires NODE_AUTH_TOKEN set for GitHub Packages)
dev:
	npm install
	npm start

# Full production build: React bundle
bundle:
	npm install
	npm run build

# Deploy to GitHub Pages (builds first via predeploy hook)
deploy:
	npm run deploy

# Remove build artifacts
clean:
	rm -rf dist
