import { Model } from 'vendor/astro/http/Model';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends Model {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public username: string;
    @Column()
    public email: string;
    @Column()
    public password: string;

}
