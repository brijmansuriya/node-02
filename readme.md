npm init -y

npm install express @prisma/client mysql2
npm install -D typescript ts-node @types/node @types/express prisma

npm install -D tsx

npx tsc --init

npx prisma db push
npx prisma generate --generator-client-output ./node_modules/@prisma/client


//ts path set 

npm install --save-dev tsconfig-paths



////////////////////////////////////////////////////
jwt
///////////////////////////////////////////////////
npm install jsonwebtoken
npm install -D @types/jsonwebtoken




////////////////////////////////////////////////////
bcryptjs
///////////////////////////////////////////////////
npm install bcryptjs
npm install -D @types/bcryptjs

----ex---
// Hash password with 10 rounds of salt
const hashedPassword = await bcrypt.hash(password, 10);

//compare
const isValid = await bcrypt.compare(password, user.password);


///////////////////////////////////////////////////////
npm install zod
///////////////////////////////////////////////////////




///////////////////////////////////////////////////////
npm install multer
///////////////////////////////////////////////////////


login
ragister
image uplode 
crud
peginetion
mail

socket 
ejs
