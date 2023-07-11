import { Request, Response } from 'express';
import convert from '../helpers/convert';
import { TCoin } from '../middlewares/validations';

async function getCurrencyQuotation(req: Request, res: Response) {

    const data: TCoin = {
        base: req.body.base as string,
        end: req.body.end as string,
        value: req.body.value as string,
    };

    const result = await convert(data.value, data.base, data.end);

    if (result.error) {
        return res.json({
            error: result.error,
            value: result.value,
        });
    };

    return res.json({
        error: result.error,
        value: result.value,
    });
};


const controllers = {
    getCurrencyQuotation,
};
export default controllers;
