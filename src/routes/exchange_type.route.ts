import { Router } from 'express';
import { ExchangeTypeController } from '../controllers/exchange_type.controller';
export class ExchangeTypeRoutes {
    public router: Router;
    public exchangeTypeController: ExchangeTypeController = new ExchangeTypeController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get(`/`, this.exchangeTypeController.getAllExchangeType);
        this.router.get(`/:id`, this.exchangeTypeController.getExchangeTypeById);
        // this.router.put(`/:id`, this.categoryController.updateCategoryById);
        this.router.delete(`/:id`, this.exchangeTypeController.deleteExchangeById);
        this.router.post(`/`, this.exchangeTypeController.createExchangeType);
    }
}