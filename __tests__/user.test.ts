import { prismaClient } from "../prisma/client";
import { ICreateUserInputPayload } from "../src/models/userModel";
import { UserService } from "../src/services/userService";
import { faker } from '@faker-js/faker';

let userService: UserService;

beforeAll(() => {
  userService = new UserService();
});

afterAll(async () => {
    await prismaClient.$disconnect();
})

describe('UserService (Integration)', () => {
    const referralUser:ICreateUserInputPayload = {
        email: faker.internet.email(),
        identification_number: faker.finance.routingNumber(),
        name: faker.person.fullName()
    }

    const userData:ICreateUserInputPayload = {
        email: faker.internet.email(),
        identification_number: faker.finance.routingNumber(),
        name: faker.person.fullName()
    }

    const userDataWithReferral:ICreateUserInputPayload = {
        email: faker.internet.email(),
        identification_number: faker.finance.routingNumber(),
        name: faker.person.fullName(),
        referral_email: referralUser.email
    }

    let createdUser: any;
    let createdUserWithReferral: any;

  it('should create a new user in the database', async () => {
    createdUser = await userService.createUser(userData)
    expect(createdUser).toBeDefined();
    expect(createdUser.identificationNumber).toEqual(userData.identification_number);
    expect(createdUser.referralEmail).toBeNull()
  });

  it('should create a new referral user in the database', async () => {
    createdUserWithReferral = await userService.createUser(referralUser)
    expect(createdUserWithReferral).toBeDefined();
    expect(createdUserWithReferral.identificationNumber).toEqual(referralUser.identification_number);
    expect(createdUserWithReferral.referralEmail).toBeNull()
  });

  it('should create a new user with referral', async () => {
    const createdUserWithReferral = await userService.createUser(userDataWithReferral)
    expect(createdUserWithReferral).toBeDefined();
    expect(createdUserWithReferral.identificationNumber).toEqual(userDataWithReferral.identification_number);
    expect(createdUserWithReferral.referralEmail).toEqual(referralUser.email);
  });

  it('should throw error that user exists', async () => {
    await expect(userService.createUser(userData)).rejects.toThrow('El número de identificación ya está registrado.')
  });

  it('should get an user ', async () => {
    const newUserWithReferral = await userService.getUserWithReferrals(createdUserWithReferral.id)
    expect(newUserWithReferral).toBeDefined();
    expect(newUserWithReferral.referredUsers.length).toBeGreaterThan(0);
  });

  it('should delete user with no referral email', async () => {
    await expect(userService.deleteUser(createdUser.id)).resolves.toEqual('usuario eliminado')
  });
});