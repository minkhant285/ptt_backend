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
import { ExchangeTransitionEntity } from './exchange_transition.entity';

@Entity('exchange_rate')
export class ExchangeRateEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @OneToMany(() => ExchangeTransitionEntity, (ex) => ex.rate)
    exchange_types: ExchangeTransitionEntity[];

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    updated_at: Date;
}

