export interface ICreateExchangeType {
    title: string;
    icon?: string;
}

export interface IExchangeType extends ICreateExchangeType {
    id: string;
}

export interface ICreateExchangeTransition {
    exchange_type: IExchangeType;
    price: number;
}

export interface IExchangeTransition extends ICreateExchangeTransition {
    id: string;
}


export interface ICreateExchangeRate {
    exchange_types: IExchangeTransition[];
    user_id: string;
}

export interface IExchangeRate extends ICreateExchangeRate {
    id: string;
    date?: Date;
    time?: Date;
    trade_type?: number;
}