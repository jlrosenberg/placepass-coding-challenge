This app was built with TypeScript, runs via node.js, and makes request using the Fetch API. I also created a simple bash script to pass along arguments into a yarn script to make executing the app easier. 

To install all dependencies, execute
```yarn```

To run the app with a nodemon, execute
```yarn start {args....}```

To run the app one time, execute
```yarn placepass-cli {args...}```

To reinstall all dependencies:
```yarn refresh```

Alternatively, you can use the placepass-cli bash script to execute the app (recommended):

Valid ways to run the app:

./placepass-cli display users {env}
./placepass-cli display environments 
./placepass-cli reserve {env} {microservice} {microservice} ...
./placepass-cli release {env}
./placepass-cli release {env} {reservation_id}
./placepass-cli help
./placepass-cli version