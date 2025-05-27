import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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
