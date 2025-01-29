import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { userSchema, userUpdateSchema } from "../utils/validation";

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      const user = await userService.createUser(req.body);
      res.status(201).json({ message: "Usuario creado exitosamente.", user });
    }
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.user_id;
    const user = await userService.getUserWithReferrals(userId);
    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = userUpdateSchema.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message });
        } else {
            const userId = req.params.user_id;
            const newName = req.body.name;
            const newEmail = req.body.email;
            const user = await userService.updateUser(userId,newName, newEmail );
            res.status(200).json(user);
        }
      } catch (error: any) {
        console.log(error);
        next(error);
      }
};

export const deleteUser = async (req: Request, res: Response,  next: NextFunction) => {
    try {
        const userId = req.params.user_id;
        const user = await userService.deleteUser(userId);
        res.status(200).json({ message: 'usuario eliminado'});
      } catch (error: any) {
        console.log(error);
        next(error);
      }
};
