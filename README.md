## Tools
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [Typescript](https://www.typescriptlang.org/)

## Project Structure
```
PROJECT
├── public
|  └── images 
├── src
|  ├── config
|  ├── routes
|  ├── middlewares
|  ├── app.ts
|  └── index.ts
├── package.json
└── tsconfig.json
```

## Routes
```
#get all the images.
GET /images

#get images by name
GET /images/:name

#upload images
POST /upload/images

#delete images by name
DELETE /images/:name
``` 
