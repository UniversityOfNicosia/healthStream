import {Connection} from 'typeorm'
import {Factory, Seeder} from 'typeorm-seeding'
import { Users } from '../common/users'
import { User } from '../entity'
 
export default class UserSeeds implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userRepo = connection.manager.getRepository('User')
    const dbUsers = await userRepo.find()

    if (dbUsers?.length > 0) {
      return
    }
    return await connection.createQueryBuilder().insert().into(User).values(Users()).execute()
  }
}
