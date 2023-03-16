### install dependencies:
```
npm install
```
### start dev-server:
```
npm run dev
```
### create SQL migration and run migration file against database
```
npx prisma migrate dev --name init
```

### Note: current .env file is needed!
### Note: if VSCode shows errors after changing prisma schema, hit Ctrl + Shift + P, then search for Restart TS server