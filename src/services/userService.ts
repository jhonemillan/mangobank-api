import { prismaClient, Prisma } from "../../prisma/client";
import { ICreateUserInputPayload } from "../models/userModel";

export class UserService {
  async createUser(data: ICreateUserInputPayload) {
    const { name, identification_number, email, referral_email } = data;

    const user: Prisma.UserCreateInput = {
      email: email,
      name,
      identificationNumber: identification_number,
    };

    if (referral_email) {
      const referred = {
        connect: {
          email: referral_email,
        },
      };

      user.referredBy = referred;
    }

    const existingUserById = await prismaClient.user.findUnique({
      where: { identificationNumber: identification_number },
    });
    if (existingUserById) {
      throw new Error("El número de identificación ya está registrado.");
    }

    const existingUserByEmail = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    let referredById = null;
    if (referral_email) {
      const referringUser = await prismaClient.user.findUnique({
        where: { email: referral_email },
      });
      if (!referringUser) {
        throw new Error("El correo electrónico del referidor no existe.");
      }
      referredById = referringUser.id;
    }

    const newUser = await prismaClient.user.create({
      data: user,
    });

    return newUser;
  }

  async getUserWithReferrals(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        referredUsers: {
          omit: {
            identificationNumber: true,
          },
        },
      },
      omit: { identificationNumber: true },
    });

    if (!user) {
      throw new Error("El usuario no existe");
    }

    return user;
  }

  async updateUser(userId: string, name?: string, email?: string) {
    const existingUser = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new Error("El usuario no existe");
      }

      if (email && email !== existingUser.email) {
        const userWithEmail = await prismaClient.user.findUnique({
          where: {
            email: email,
          },
        });
  
        if (userWithEmail) {
            throw new Error("El correo ya esta en uso");
        }
      }

      const updatedUser = await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name || existingUser.name,
          email: email || existingUser.email,
        },
      });

      return updatedUser;
  }

  async deleteUser(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        referredUsers: {
          omit: {
            identificationNumber: true,
          },
        },
      },
      omit: { identificationNumber: true },
    });

    if (!user) {
      throw new Error("El usuario no existe");
    }

    if (user.referredUsers.length > 0) {
      throw new Error("El usuario puede ser borrado ya que existen dependencias activas");
    }

    const deleteUser = await prismaClient.user.delete({
      where: {
        id: userId,
      },
    });

    return 'usuario eliminado'
  }
}
