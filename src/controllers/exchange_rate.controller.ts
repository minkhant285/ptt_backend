import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/data-source';
import { ExchangeRateEntity } from '../db/entities/exchange_rate.entity';
import { ICreateExchangeRate, ICreateExchangeTransition, IExchangeRate } from '../models/exchange.model';
import { ExchangeTransitionEntity } from '../db/entities/exchange_transition.entity';

export class ExchangeRateController {
    private exchangeRateRepository: Repository<ExchangeRateEntity>;
    private exchangeTransitionRepository: Repository<ExchangeTransitionEntity>;

    constructor() {
        this.exchangeRateRepository = AppDataSource.getRepository(ExchangeRateEntity);
        this.exchangeTransitionRepository = AppDataSource.getRepository(ExchangeTransitionEntity);
    }


    getAllExchangeRate = async (req: Request, res: Response) => {
        let exchange = await this.exchangeRateRepository.find({ relations: ['exchange_transition', 'exchange_transition.exchange_type'] });

        return res.json({
            data: exchange,
            status: res.statusCode
        });
    };


    getAllExchangeTransitions = async (req: Request, res: Response) => {
        let exchange = await this.exchangeTransitionRepository.find({ relations: ['exchange_type'] });
        return res.json({
            data: exchange,
            status: res.statusCode
        });
    };



    getExchangeRateById = async (req: Request, res: Response) => {
        let id: string = req.params.id;
        let ex_rate = await this.exchangeRateRepository.findOne({ where: { id }, relations: ['exchange_transition', 'exchange_transition.exchange_type'] });
        return res.status(200).json({
            data: ex_rate,
            status: res.statusCode
        });
    };

    updateExchangeRateById = async (req: Request, res: Response) => {
        let id: string = req.params.id;
        let body = req.body ?? null;
        let updated = await this.exchangeRateRepository.update(id, body);
        if (updated.affected !== 1) {
            return res.status(500).json({
                data: updated,
                status: res.statusCode
            })
        }
        return res.status(204).json({
            data: updated,
            status: res.statusCode
        });
    };

    deleteExchangeRateById = async (req: Request, res: Response) => {
        let id: string = req.params.id; // get the user id from req.params
        let deleted = await this.exchangeRateRepository.delete(id);
        return res.status(204).json({
            data: deleted,
            status: res.statusCode
        });
    };

    createExchangeRate = async (req: Request, res: Response) => {
        // get the data from req.body
        let body = req.body;
        console.log(body);
        let created = await this.exchangeRateRepository.save(body);
        // return response
        return res.status(201).json({
            data: created,
            status: res.statusCode
        });
    };

    createExchangetransitions = async (req: Request, res: Response) => {
        // get the data from req.body
        let body: ICreateExchangeTransition = req.body;
        console.log(body)

        let created = await this.exchangeTransitionRepository.save(body);
        // return response
        return res.status(201).json({
            data: created,
            status: res.statusCode
        });
    };
}