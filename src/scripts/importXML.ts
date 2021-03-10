import { mapValues} from 'lodash'
import {initDatabaseConnection} from '../database/init'
import {DataServiceFactory} from '../database/services/Factory'
import appConfig from '../config'
import {ServiceFactory} from '../services'
import { TransactionUtil } from '../utils/transactionUtil'
import path from 'path'
import fs from 'fs'
import xml2js from 'xml2js'
import camelcaseKeys from 'camelcase-keys'
 
const loadXML = async () => {
  const xmlFile = fs.readFileSync(path.join(__dirname, `./gesy.xml`))
   return xmlFile
}

  
const convertToJson = async (xmlFile : any) =>  {
  const parser = new xml2js.Parser({explicitArray : false});
  const result = await parser.parseStringPromise(xmlFile)

  const camelCaseProperties = await camelcaseKeys(result,  {deep: true});
 // console.log(" apotelesmna ", util.inspect(camelCaseProperties, false, null, true))
   return camelCaseProperties
}
  

const mappingJSON = async (jsonFile : any, ds: DataServiceFactory) =>  {
   if (jsonFile.labExecution ) {
    if (jsonFile.labExecution.header ) {
      const parameters = mapValues( jsonFile.labExecution.header, v => v === '' ? null : v)
      await ds.getLaboratoryDS().add(parameters)
    }
    if ( jsonFile.labExecution.activities) {
      const parameters = mapValues( jsonFile.labExecution.activities.activity, v => v === '' ? null : v)
      await ds.getLabActivityDS().add(parameters)
    }
  }
} 

const parseXML = async () => {
  const connection = await initDatabaseConnection()

  await TransactionUtil.runInTransaction(async (queryRunner: any) => {
    const ds = new DataServiceFactory(queryRunner.manager)
    const serviceFactory = new ServiceFactory(appConfig)
    const xmlFile = await loadXML()
    const jsonFile = await convertToJson(xmlFile)

    if (jsonFile) {
     await mappingJSON(jsonFile, ds)
    }

 
  }, connection)
  console.log('Finished')
}

const gesyXML = parseXML()

export default gesyXML
