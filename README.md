# Creathus-Courses-Backend

# Install

install packages
```
npm install
```

or

```
yarn
```

# Config

Make a copy of `.env.example` to `.env`

Fill the fields to the information (it's an example)
```
DATABASE_URL="file:./courses.db"
PORT=5000
```

# Run

to start the nest server run
```
npm run start
```
or
```
yarn start
```

# Documentation
with the server running

```
http://localhost:{port}/docs
```
![image](https://user-images.githubusercontent.com/101012531/165840981-cd4075d4-00e4-424a-b42e-540893635b4d.png)


# Tests

to run the tests and/or check the coverage run
```
npm run test:cov
```
or
```
yarn test:cov
```

![image](https://user-images.githubusercontent.com/101012531/165840174-a99e2105-b4d9-4b94-85b4-49e83c0e1fca.png)


# If something went wrong

make sure to run
```
npx prisma migrate dev
```
if DB is empty you need to make in this order

```
Instructor > Trail > Course > Lesson
```
