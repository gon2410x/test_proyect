// import {Entity,Column, PrimaryGeneratedColumn,BaseEntity,CreateDateColumn,UpdateDateColumn, OneToMany} from "typeorm";
// import { Booking } from "./Booking";
  
//   @Entity() // se puede pasar como parametro el nombre de tabla ej: 'usersTable'

//   export class Event extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     type: string;
  
//     @Column()
//     name: string;

//     @Column()
//     descripcion: string;

//     @Column()
//     lugar: string;

//     @Column()
//     fechaHora: string;

//     @Column()
//     gps: string;

//     @Column()
//     precio: string;

//     @Column()
//     limite: number;
  
//     @CreateDateColumn()
//     createdAt: Date;
  
//     @UpdateDateColumn()
//     updatedAt: Date;
    
//     @OneToMany( () => Booking, (booking) => booking.event )
//     booking: Booking[]
//   }
