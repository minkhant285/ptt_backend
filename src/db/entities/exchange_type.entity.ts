import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { ExchangeRateEntity } from './exchange_rate.entity';

@Entity('exchange_type')
export class ExchangeTypeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    // @Column()
    // price: number;

    @Column({ nullable: true })
    icon: string;

    @ManyToOne(() => ExchangeRateEntity, (extype) => extype.id)
    @JoinColumn({ name: 'exchange_rate_id' })
    exchange_rate_id: ExchangeRateEntity;

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}