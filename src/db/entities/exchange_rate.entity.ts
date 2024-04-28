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

    // @Column()
    // user_id: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @OneToMany(() => ExchangeTransitionEntity, ex_trans => ex_trans.exchange_rate, { cascade: true })
    public exchange_transition: ExchangeTransitionEntity[];

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    // @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    // updated_at: Date;
}

