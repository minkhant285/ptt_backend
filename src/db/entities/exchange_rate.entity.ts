import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';
import { ExchangeTypeEntity } from './exchange_type.entity';

@Entity('exchange_rate')
export class ExchangeRateEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @OneToMany(() => ExchangeTypeEntity, (ex) => ex.exchange_rate_id)
    exchange_type: ExchangeTypeEntity[];

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}