# React
Local storage Demo: 
https://lauchunlok.github.io/react-todo_list_localStorage/

1. PropTypes
    1. defaultProps
    2. .propTypes
2. dynamic styles
    1. style={{ backgroundColor: color }}
    1. className={`task ${task.reminder ? "reminder" : ""}`}


## Build for production
1. npm run build
2. npm i -g serve
3. serve -s build -p 8000 
<!-- serve on port 8000 -->


## JSON server
mock REST API with our own data

1. npm i json-server
2. `"server": "json-server --watch db.json --port 5000"`
3. Run the JSON server (http://localhost:5000)
```npm run server````



### Run React dev server (http://localhost:3000)
``` 
npm start
```
### Run the JSON server (http://localhost:5000)
``` 
npm run server
```
### To build for production
```
npm run build
```