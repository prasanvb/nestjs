import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Report } from "../reports/reports.entity";

/* 
  NOTE: Class Serializer Interceptor Approach
  import { Exclude } from "class-transformer"; 
*/

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  /* 
    NOTE: Class Serializer Interceptor Approach not very beneficial
    @Exclude() 
  */
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log("New user entity record inserted into DB " + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log("User entity record updated in DB " + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log("User entity record removed from DB " + this.id);
  }
}
