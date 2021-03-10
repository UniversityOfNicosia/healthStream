 
## Running the backend

copy the contents of .env.template into a new file: .env.local
 
server running in port : 3000 
start server with for development:
 ```bash
 npm run dev
```

DATABASE default port is : 3306

MIGRATIONS:

 
MIGRATION GENERATE:
to generate a new migration file run: 

```bash
 npm run migration:gen *table_name*
 ```
    
migration files will be prefixed with the given {{current_timestamp}}-*table_name* (to be able to rollback the DB)


MIGRATION GENERATE NEW EMPTY FILE:
to generate a new empty migration file run: 
  ```bash
    npm run migration:create {{current_timestamp}}-*table_name*
  ```
this will create an empty migration files overriding the up() and down() methods of TypeORM


MIGRATION RUN :
to run the migration run

```bash
  npm run migration:run
```

MIGRATION RESET:
to reset the database (run all migration from start to bottom) run:
```bash
  npm run reset:db 
```

CREATE SEED:
to create a seed file in /seeds and then run run:
```bash
  npm run seed
``` 
  
MIGRATE REVERT
to revert to the last migration file:
```bash
  npm run migration:revert
```


## Build
```bash
npm run build
```

## Test
```bash
# unit tests
npm run test
 
