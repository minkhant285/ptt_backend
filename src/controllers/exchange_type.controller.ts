import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/data-source';
import { ICreateExchangeType, IExchangeRate, IExchangeType } from '../models/exchange.model';
import { ExchangeTypeEntity } from '../db/entities/exchange_type.entity';

export class ExchangeTypeController {
    private exchangeTypeRepository: Repository<ExchangeTypeEntity>;

    constructor() {
        this.exchangeTypeRepository = AppDataSource.getRepository(ExchangeTypeEntity)
    }


    getAllExchangeType = async (req: Request, res: Response) => {
        let exchangeTypes = await this.exchangeTypeRepository.find({ loadRelationIds: true });
        return res.json({
            data: exchangeTypes,
            status: res.statusCode
        });
    };

    getExchangeTypeById = async (req: Request, res: Response) => {
        let id: string = req.params.id;
        let ex_type = await this.exchangeTypeRepository.findOne({ where: { id } });
        return res.status(200).json({
            data: ex_type,
            status: res.statusCode
        });
    };

    updateCategoryById = async (req: Request, res: Response) => {
        let id: string = req.params.id; // get the user id from the req.params
        let body = req.body ?? null; // get the data from req.body
        let updated = await this.exchangeTypeRepository.update(id, body);
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

    deleteExchangeById = async (req: Request, res: Response) => {
        let id: string = req.params.id; // get the user id from req.params
        let deleted = await this.exchangeTypeRepository.delete(id);
        return res.status(204).json({
            data: deleted,
            status: res.statusCode
        });
    };

    createExchangeType = async (req: Request, res: Response) => {
        // get the data from req.body
        let body: ICreateExchangeType = req.body;
        let created = await this.exchangeTypeRepository.save(body);
        // return response
        return res.status(201).json({
            data: created,
            status: res.statusCode
        });
    };
}