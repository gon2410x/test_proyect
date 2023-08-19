// import {
//     Entity,
//     Column,
//     PrimaryGeneratedColumn,
//     BaseEntity,
//     CreateDateColumn,
//     UpdateDateColumn,
//     OneToMany,
//   } from "typeorm";
// import { Booking } from "./Booking";

  
//   @Entity() // se puede pasar como parametro el nombre de tabla ej: 'usersTable'
//   export class User extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column()
//     email: string;
  
//     @Column()
//     password: string;
  
//     @CreateDateColumn()
//     createdAt: Date;
  
//     @UpdateDateColumn()
//     updatedAt: Date;

//     @OneToMany( () => Booking, (booking) => booking.user)
//     booking: Booking[]
//   }