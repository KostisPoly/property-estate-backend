import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm";
import { User } from '../users/user.entity'

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column({ default: false })
    verified: boolean;

    @Column()
    type: string;

    @Column()
    category: string;

    @Column()
    size: number;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @ManyToOne(
        () => User,
        user => user.reports
    )
    userId: User;
}