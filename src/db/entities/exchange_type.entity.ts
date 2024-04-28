import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { ExchangeRateEntity } from './exchange_rate.entity';
import { ExchangeTransitionEntity } from './exchange_transition.entity';

@Entity('exchange_type')
export class ExchangeTypeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    icon: string;

    @OneToMany(() => ExchangeTransitionEntity, ex_trans => ex_trans.exchange_type)
    public exchange_transition: ExchangeTransitionEntity[];

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;

    // @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    // updated_at: Date;

}
