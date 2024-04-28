import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    DeleteDateColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ExchangeTypeEntity } from './exchange_type.entity';
import { ExchangeRateEntity } from './exchange_rate.entity';

@Entity('exchange_transitions')
export class ExchangeTransitionEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column()
    // exchange_type_id: string;

    // @Column()
    // exchange_rate_id: string;

    @Column()
    price: number;

    @ManyToOne(() => ExchangeTypeEntity, (ex_type) => ex_type.exchange_transition)
    public exchange_type: ExchangeTypeEntity;

    @ManyToOne(() => ExchangeRateEntity, (ex_rate) => ex_rate.exchange_transition)
    public exchange_rate: ExchangeRateEntity;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    // @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    // updated_at: Date;
}