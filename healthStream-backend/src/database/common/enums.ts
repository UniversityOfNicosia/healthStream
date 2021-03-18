export enum Gender {
    M = "M" ,
    F = "F",
    O = "O"
  }
  
  export enum ActivityType {
    PANEL =  'PANEL',
    TEST  =  'TEST'
  } 
  
  export enum OrderCategory {
      LABI = 'LABI',
      LABH = 'LABH',
      LABMI = 'LABMI',
      LABB = 'LABB',
      LABMB =  'LABMB',
      LABMILABI  = 'LABMILABI'
  }
  
  export enum UserDocType {
      NID = 'NID',
      ARC = 'ARC'
  }
  

  //'GOOGLE IF ENUMS'

  //TO BE EXTENDED
  export enum DataSourceName {
    ACTIVITY = 'com.google.activity.segment',
    BMR = 'com.google.calories.bmr',
    CALORIES_BURNED= 'com.google.calories.expended',
    CYCLING_PEDALING_CADENCE = 'com.google.cycling.pedaling.cadence',
    CYCLING_PENDALING_CUMULATIVE= 'com.google.cycling.pedaling.cumulative',
    HEART_POINTS= 'com.google.heart_minutes',
    MOVE_MINUTES ='com.google.active_minutes',
    POWER = 'com.google.power.sample',
    STEP_COUNT_CADENCE = 'com.google.step_count.cadence',
    STEP_COUNT_DELTA = 'com.google.step_count.delta',
    WORKOUT = 'com.google.activity.exercise',

    BODY_FAT_PERCENTAGE = 'com.google.body.fat.percentage',
    HEART_RATE = 'com.google.heart_rate.bpm',
    // HEART_RATE= 'com.google.heart_rate.summary',
    HEIGHT ='com.google.height',
    WEIGHT = 'com.google.weight',

    CYCLING_WHEEL_REVOLUTION_PER_MINUTE= 'com.google.cycling.wheel_revolution.rpm',
    CYCLING_WHEEL_REVOLUTION_CUMULATIVE = 'com.google.cycling.wheel_revolution.cumulative',
    DISTANCE_DELTA= 'com.google.distance.delta',
    LOCATION_SAMPLE = 'com.google.location.sample',
    SPEED = 'com.google.speed',

    HYDRATION= 'com.google.hydration',
    NUTRITION = 'com.google.nutrition',
    HYDRATION_NUT= 'com.google.nutrition.summary',

    SLEEP = 'com.google.sleep.segment',

    BLOOD_GLUCOSE = 'com.google.blood_glucose',
    BLOOD_PRESSURE = 'com.google.blood_pressure',
    BODY_TEMPERATURE = 'com.google.body.temperature',
    CERVICAL_MUCUS = 'com.google.cervical_mucus',
    CERVICAL_POSITION = 'com.google.cervical_position',
    MENSTRUATION = 'com.google.menstruation',
    OVULATION = 'com.google.ovulation_test',
    OXYGEN_SATURATION = 'com.google.oxygen_saturation',
    VAGINAL_SPOTTING = 'com.google.vaginal_spotting',


   } 