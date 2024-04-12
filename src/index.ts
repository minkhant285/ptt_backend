import express from 'express';
import { envData } from './utils/environment';
import cors from 'cors';
import "reflect-metadata"
import { AppDataSource } from './db/data-source';
import path from 'path';
import { ExchangeRateRoutes } from './routes/exchange_rates.route';
import { ExchangeTypeRoutes } from './routes/exchange_type.route';

// import { PurchaseRoutes } from './routes/purchase.routes';
// import { PurchaseDetailRoutes } from './routes/purchase-detail.routes';
// import { UOMRoutes } from './routes/uom.routes';
// import { CategoryRoutes } from './routes/category.routes';
// import { CustomerRoutes } from './routes/customer.routes';

const options: cors.CorsOptions = {
    origin: '*'
};
const apiPrefix = '/api';
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.DBinit();
    }

    private config() {
        this.app.set("port", envData.app_port || 50001);
        this.app.use(cors(options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    public routes(): void {
        // this.app.use("/", (req, res) => res.send('Hello world!'))
        this.app.use('/image', express.static(path.join(process.cwd(), 'assets')));
        this.app.use(`${apiPrefix}/exchange_rates`, new ExchangeRateRoutes().router);
        this.app.use(`${apiPrefix}/exchange_types`, new ExchangeTypeRoutes().router);
        // this.app.use(`${apiPrefix}/order`, new OrderRoutes().router);
        // this.app.use(`${apiPrefix}/order_detail`, new OrderDetailRoutes().router);
        // this.app.use(`${apiPrefix}/pf_margin`, new PF_MarginRoutes().router);
        // this.app.use(`${apiPrefix}/supplier`, new SupplierRoutes().router);
        // this.app.use(`${apiPrefix}/customer`, new CustomerRoutes().router);
        // this.app.use(`${apiPrefix}/purchase`, new PurchaseRoutes().router);
        // this.app.use(`${apiPrefix}/purchase_detail`, new PurchaseDetailRoutes().router);
        // this.app.use(`${apiPrefix}/uom`, new UOMRoutes().router);
        // this.app.use(`${apiPrefix}/category`, new CategoryRoutes().router);
        this.app.use((req, res, next) => {
            const error = new Error('No Route Found');
            return res.status(404).json({
                message: error.message
            });
        });
    }

    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log(`ITVerse API Service is Running`, this.app.get("port"))
        })
    }

    private async DBinit() {
        try {
            const db = await AppDataSource.initialize();
            if (db.isInitialized) console.log("DB Connected!!");
        } catch (err) {
            console.log(err);
        }
    }
}

const server = new Server();
server.start();