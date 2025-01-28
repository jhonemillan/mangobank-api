import { Request, Response } from 'express';
import { createUserService, updateUserService } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  // Lógica para crear un usuario
};

export const getUserById = async (req: Request, res: Response) => {
  // Lógica para obtener un usuario por ID
};

export const updateUser = async (req: Request, res: Response) => {
  // Lógica para actualizar un usuario
};

export const deleteUser = async (req: Request, res: Response) => {
  // Lógica para eliminar un usuario
};