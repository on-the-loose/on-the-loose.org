emulator:
	@echo "\n\033[3mStarting Firebase emulator \n"
	@cd firebase; firebase emulators:start

tests:
	@echo "\n\033[3mRunning tests. Make sure to have the emulator running with \033[1mmake emulator\033[0m\n"
	@cd firebase/tests; npm i; npm run test

devserver:
	@echo "\n\033[3mStarting website local development server \n"
	@cd website; npm i; npm start

test-deployment:
	@echo "\n\033[3mDeploying to test firebase project on-the-loose-test \n"

	@echo "\n ### INSTALLING DEPENDENCIES ### \n"
	@cd website; npm i;

	@echo "\n\n\n ### BUNDLING SITE WITH PARCEL ### \n"
	@cd website; \
	API_KEY="AIzaSyBluVaLFI89dVtZssQ23LJhm3AUrtyXyKM" \
	AUTH_DOMAIN="on-the-loose-test.firebaseapp.com" \
	DB_URL="https://on-the-loose-test.firebaseio.com" \
	PROJECT_ID="on-the-loose-test" \
	STORAGE_BUCKET="on-the-loose-test.appspot.com" \
	MESSAGING_SENDER_ID="873642667332" \
  npm run build

	@echo "\n\n\n ### DEPLOYING FIREBASE PROJECT ### \n"
	@cd firebase; firebase deploy --project=on-the-loose-test --only=hosting