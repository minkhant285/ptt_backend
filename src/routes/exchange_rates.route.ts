import { Router } from 'express';
import { ExchangeRateController } from '../controllers/exchange_rate.controller';
// import { UOMController } from '../controllers/uom.controller';
// import { CategoryController } from '../controllers/category.controller';
export class ExchangeRateRoutes {
    public router: Router;
    public exchangeRateController: ExchangeRateController = new ExchangeRateController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get(`/`, this.exchangeRateController.getAllExchangeRate);
        // this.router.get(`/transitions`, this.exchangeRateController.getAllExchangeTransitions);
        // this.router.get(`/:id`, this.categoryController.getCategoryById);
        // this.router.put(`/:id`, this.categoryController.updateCategoryById);
        // this.router.delete(`/:id`, this.categoryController.deleteCategoryId);
        this.router.post(`/`, this.exchangeRateController.createExchangeRate);
        // this.router.post(`/transitions`, this.exchangeRateController.createExchangetransitions);
    }
}