test:
	@cd test; npm install;
	@cd test; npm install;

deploy-test-hosting:
	@echo "Deploying to test firebase project on-the-loose-test \n"

	@echo "\n ### INSTALLING DEPENDENCIES ### \n"
	@cd website; npm install;

	@echo "\n\n\n ### BUNDLING SITE WITH PARCEL ### \n"
	@cd website; \
	API_KEY="AIzaSyBluVaLFI89dVtZssQ23LJhm3AUrtyXyKM" \
	AUTH_DOMAIN="on-the-loose-test.web.app" \
	DB_URL="https://on-the-loose-test.firebaseio.com" \
	PROJECT_ID="on-the-loose-test" \
	STORAGE_BUCKET="on-the-loose-test.appspot.com" \
	MESSAGING_SENDER_ID="873642667332" \
  npm run build

	@echo "\n\n\n ### DEPLOYING FIREBASE PROJECT ### \n"
	@cd firebase; firebase deploy --project=on-the-loose-test --only=hosting
