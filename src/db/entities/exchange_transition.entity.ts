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

    @OneToOne(() => ExchangeTypeEntity)
    @JoinColumn()
    exchange_type: ExchangeTypeEntity;

    @ManyToOne(() => ExchangeRateEntity, (e) => e.id)
    @JoinColumn({ name: 'rate_id' })
    rate: ExchangeRateEntity;

    @Column()
    price: number;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    updated_at: Date;
}