# expense-tracker

Group Members:\
Angel Penaloza\
John Park\
Kingston Leung\
Tonirose Virata

Deployed Site: https://leungk-expense.netlify.app/
Github Directory: https://github.com/tvirata/expense-tracker/

To setup on Local Network:

git clone <dir>

cd expense-tracker

cd pb_app

npm i

npm install react-router-dom

npm start

Then:

Extract pocketbase into the pb directory

Open a new terminal in the pb directory

./pocketbase serve

Troubleshooting:

If pocketbase does not load after running ./pocketbase serve (Access denied warning),
make sure you turn off your antivirus and try again.

!!important!!
If that still does not work, delete the pb_data directory and then run ./pocketbase serve
After that, go to the admin UI page and create an administrator account with the following credentials:

Email: admin@gmail.com
Password: adminadmin

!!important!!

Deploying Website:

Change:

const pb = new PocketBase('http://127.0.0.1:8090');

to

const pb = new PocketBase('pockethost.io-dblink'); in /pb_app/src/lib/pocketbase.js

Open a terminal in pb_app and do: npm run build
Create a `_redirects` file and put it in the build output folder
Deploy
