# Travelesia-BE
This is the REST API backend from the final project at Binar Academy. Feel free to check the API documentation in the following link.

[Travelesia API documentation](https://c7-tiketku.up.railway.app/api-docs/#/)

## Authors
- [Ferdy Fadhil Lazuardi](https://github.com/FerdyLazuardi)
- [Danar Zulfian W.](https://github.com/Danarzlf)
- [Wira Adi Kurniawan](https://github.com/adikrnwn171)

## Tech Stacks
Node JS, Express Js, Sequelize, PostgreSQL, Swagger, Midtrans, Nodemailer, JWT, Axios

## Run Locally
> [!IMPORTANT]
> You must install Node.js before running this project.

Clone the project
```
https://github.com/Final-Project-C7/Tiketku-BE.git
```
Go to the project directory
```
cd Tiketku-BE
```
Install dependencies
```
npm i
```
Setup Sequelize
```
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```
Start The Server
```
npm run dev
```
## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`DB_USERNAME` `DB_PASSWORD` `DB_NAME` `DB_HOST` `DB_PORT` `PORT` `IMAGEKIT_PUBLIC_KEY` `IMAGEKIT_PRIVATE_KEY` `IMAGEKIT_URL`

