// import {Entity,Column, PrimaryGeneratedColumn,BaseEntity, ManyToOne,CreateDateColumn,UpdateDateColumn, JoinColumn} from "typeorm";
// import { User } from "./User"
// import { Event } from "./Event";
  
//   @Entity() // se puede pasar como parametro el nombre de tabla ej: 'usersTable'

//   export class Booking extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(() => Event, (event) => event.booking)
//     event: Event;

//     @ManyToOne(() => User, (user) => user.booking)
//     user: User;

//     @Column()
//     precio: string;

//     @Column()
//     fechaHora: string;

//     @Column()
//     lugar: string;

//     @Column()
//     gps: string;

//   }