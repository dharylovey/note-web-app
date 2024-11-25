import { Response, Request, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type asyncFunction<> = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchErrors =
  (controller: asyncFunction): asyncFunction =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;
