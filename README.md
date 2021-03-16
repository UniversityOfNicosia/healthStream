 
## Running the backend

copy the contents of .env.template into a new file: .env.local
 
server running in port : 3000 
start server with for development:
 ```bash
 npm run dev
```


## To Parse a local xml file with gesy standard configuration into data tables 
```bash
npm run gesy-parse
```
-> the script will parse the xml and store all its contents in our database
  

## GOOGLE FIT API

    step 1: authenticate and allow access by clicking the response url of  **http://localhost:3000/api/connect**
    step 2: use token acquired (from the redirect url of step 1) 
            as Bearer token for all other requests 

    step 3: Hit ur point of preference 
    
```bash
 # PUBLIC   
        body passing example (which represents the time interval)
          {
              "from": 1615360049000,
              "to": 1614582449000
          }

          ->  ACTIVITY
                  END POINTS PROVIDED:
                      POST:  - /api/connect/public/activity 
                      POST:  - /api/connect/public/activity/bmr  
                      POST:  - /api/connect/public/activity/caloriesBurned
                      POST:  - /api/connect/public/activity/cyclingPedalingCadence
                      POST:  - /api/connect/public/activity/cyclingPedalingCumulative
                      POST:  - /api/connect/public/activity/heartPoints
                      POST:  - /api/connect/public/activity/moveMinutes
                      POST:  - /api/connect/public/activity/power
                      POST:  - /api/connect/public/activity/stepCountCadence 
                      POST:  - /api/connect/public/activity/stepCountDelta 
                      POST:  - /api/connect/public/activity/workout
          ->  BODY
                  END POINTS PROVIDED:
                      POST:  - /api/connect/public/body/bodyFatPercentage
                      POST:  - /api/connect/public/body/heartRate
                      POST:  - /api/connect/public/body/height
                      POST:  - /api/connect/public/body/weight
                                 
          ->  SLEEP:
                      POST:  - /api/connect/public/sleep

          ->  NUTRITION:
                      POST:  - /api/connect/public/nutrition
                      POST:  - /api/connect/public/nutrition/hydration

          ->  LOCATION:
                      POST:  - /api/connect/public/location/rpm
                      POST:  - /api/connect/public/location/wheelRevolutionCumulative
                      POST:  - /api/connect/public/location/distance
                      POST:  - /api/connect/public/location/speed
```
 
 
```bash
# HEALTH   
       body passing example (which represents the time interval)
          {
              "from": 1615360049000,
              "to": 1614582449000
          }
                  END POINTS PROVIDED
                      POST:  - /api/connect/public/health/glucose
                      POST:  - /api/connect/public/health/bloodPressure
                      POST:  - /api/connect/public/health/bodyTemperature
                      POST:  - /api/connect/public/health/cervicalmucus
                      POST:  - /api/connect/public/health/cervicalPosition
                      POST:  - /api/connect/public/health/menstruation
                      POST:  - /api/connect/public/health/ovulationTest
                      POST:  - /api/connect/public/health/oxygensaturation
                      POST:  - /api/connect/public/health/vaginalSpotting 
 ``` 














## DATABASE 
DATABASE default port is : 3306
DB MIGRATIONS:

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
```







## Running the frontEnd


  
frontend is running in port : 3001
start server with for development:
 ```bash
 npm run start 
```
