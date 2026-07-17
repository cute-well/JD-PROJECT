export type ThemeMode = "light" | "dark" | "system";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

export type AuthSession = {
  id: string;
  name: string;
  email: string;
};
