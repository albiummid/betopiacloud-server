import { NextFunction, Request, Response } from "express";

type ModifiedResponse = Response & {
    success: (data: any, status?: number, message?: string) => void;
};

type TControllerFn = (
    req: Request,
    res: ModifiedResponse,
    next: NextFunction
) => void | Promise<void>;

export const handleControllerAsync =
    (controllerFn: TControllerFn) =>
    (req: Request, res: Response, next: NextFunction) => {
        const modifiedRes = res as ModifiedResponse;

        modifiedRes.success = (
            data: any,
            status?: number,
            message?: string
        ) => {
            res.status(status ?? 200).json({
                success: true,
                message,
                data: data ?? null,
            });
        };

        Promise.resolve(controllerFn(req, modifiedRes, next)).catch(next);
    };
