export type SimpleUser = {
  address: string;
  avatar: string;
  userName: string;
};

export type User = SimpleUser & {
  fullName: string;
  email: string;
};
