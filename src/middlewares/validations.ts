import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

function validations(req: Request, res: Response, next: NextFunction) {

    const result = coinSchema.safeParse({
        base: req.body.base,
        end: req.body.end,
        value: req.body.value,
    });

    if (!result.success) {
        return res.status(400).json(result.error);
    };

    return next();
};


const coinSchema = z.object({
    base:
        z.string({ required_error: 'Insira o valor do campo "De".' })
            .nonempty('Insira a moeda que sera convertida.')
            .trim()
            .refine((item) => {
                let test = Number(item);
                return isNaN(test) ? true : false;
            }, 'Insira uma moeda valida.')
            .refine((item) => !item ? false : true, 'Campo base não informado.'),
    end:
        z.string({ required_error: 'Insira o valor do campo "Para".' })
            .nonempty('Insira para qual moeda quer converter.')
            .trim()
            .refine((item) => {
                let test = Number(item);
                return isNaN(test) ? true : false;
            }, 'Insira uma moeda valida.')
            .refine((item) => !item ? false : true, 'Campo end não informado.'),
    value:
        z.string({ required_error: 'Insira o valor do campo "Valor".' })
            .nonempty('Insira o valor a converter.')
            .trim()
            .refine((item) => !item ? false : true, 'Campo value não informado.')
            .refine((item) => {
                const value = currencyFormat(item);
                return !value ? false : true;
            }, 'O campo "valor" precisar se um numero valído.'),
}).superRefine((arg, ctx) => {

    if (arg.base === arg.end) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Moedas iguais não podem ser convertidas.'
        });
    };
});

function currencyFormat(value: string): number | null {
    let number = Number(value.replaceAll('.', '').replace(',', '.'));
    if (isNaN(number)) {
        return null;
    }
    else {
        return number;
    };
};

export type TCoin = z.infer<typeof coinSchema>;

export default validations;
