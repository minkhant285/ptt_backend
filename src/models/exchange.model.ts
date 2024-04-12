export interface ICreateExchangeType {
    title: string;
    icon?: string;
}

export interface IExchangeType extends ICreateExchangeType {
    id: string;
}


export interface ICreateExchangeRate {
    exchange_type: ICreateExchangeType[];
    exchange_info?: { exchange_type: ICreateExchangeType, price: number };
    user_id: string;
}

export interface IExchangeRate extends ICreateExchangeRate {
    id: string;
    date?: Date;
    time?: Date;
    trade_type?: number;
}