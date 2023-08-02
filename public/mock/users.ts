import { faker } from '@faker-js/faker';

export const USERS: any[] = [];

function generateUsers() {
  for (let i = 0; i < 10; ++i) {
    const address = '0x' + faker.string.hexadecimal({ length: 30 });
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = faker.person.fullName({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });
    const username = faker.internet.userName({ firstName, lastName });
    const avatar = faker.image.avatar();

    USERS.push({
      address,
      fullName,
      email,
      username,
      avatar,
    });
  }
}

export function findUserByAddress(address: string) {
  return USERS.find((user) => user.address === address);
}

generateUsers();

export const MY_ACCOUNT = USERS[0];
