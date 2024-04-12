import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/data-source';
import { ExchangeRateEntity } from '../db/entities/exchange_rate.entity';
import { ICreateExchangeRate, IExchangeRate } from '../models/exchange.model';

export class ExchangeRateController {
    private exchangeRateRepository: Repository<ExchangeRateEntity>;

    constructor() {
        this.exchangeRateRepository = AppDataSource.getRepository(ExchangeRateEntity)
    }


    getAllExchangeRate = async (req: Request, res: Response) => {
        let exchange: IExchangeRate[] = await this.exchangeRateRepository.find({ relations: ['exchange_type'] });
        return res.json({
            data: exchange,
            status: res.statusCode
        });
    };

    // getCategoryById = async (req: Request, res: Response) => {
    //     let id: string = req.params.id;
    //     let supplier: IUOM | null = await this.exchanteRepository.findOne({ where: { id }, relations: { stock: true } });
    //     return res.status(200).json({
    //         data: supplier,
    //         status: res.statusCode
    //     });
    // };

    // updateCategoryById = async (req: Request, res: Response) => {
    //     let id: string = req.params.id; // get the user id from the req.params
    //     let body: ICreateCategory = req.body ?? null; // get the data from req.body
    //     let updated = await this.exchanteRepository.update(id, body);
    //     if (updated.affected !== 1) {
    //         return res.status(500).json({
    //             data: updated,
    //             status: res.statusCode
    //         })
    //     }
    //     return res.status(204).json({
    //         data: updated,
    //         status: res.statusCode
    //     });
    // };

    // deleteCategoryId = async (req: Request, res: Response) => {
    //     let id: string = req.params.id; // get the user id from req.params
    //     let deleted = await this.exchanteRepository.softDelete(id);
    //     return res.status(204).json({
    //         data: deleted,
    //         status: res.statusCode
    //     });
    // };

    createExchangeRate = async (req: Request, res: Response) => {
        // get the data from req.body
        let body: ICreateExchangeRate = req.body;
        let created = await this.exchangeRateRepository.save(body);
        // return response
        return res.status(201).json({
            data: created,
            status: res.statusCode
        });
    };
}