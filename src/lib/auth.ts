import type { AuthSession, StoredUser } from "@/types";

const USERS_KEY = "careercanvas_users";
const CURRENT_USER_KEY = "careercanvas_current_user";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStorage<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getUsers() {
  return readStorage<StoredUser[]>(USERS_KEY, []);
}

export function getCurrentUser() {
  return readStorage<AuthSession | null>(CURRENT_USER_KEY, null);
}

export function signOut() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(CURRENT_USER_KEY);
}

export function signUpUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const email = normalizeEmail(input.email);
  const users = getUsers();

  if (users.some((user) => normalizeEmail(user.email) === email)) {
    return { success: false, message: "An account with this email already exists." } as const;
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email,
    password: input.password,
    createdAt: new Date().toISOString(),
  };

  const nextUsers = [...users, newUser];
  writeStorage(USERS_KEY, nextUsers);
  writeStorage<AuthSession>(CURRENT_USER_KEY, {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  });

  return { success: true } as const;
}

export function signInUser(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);
  const user = getUsers().find((item) => normalizeEmail(item.email) === email);

  if (!user || user.password !== input.password) {
    return { success: false, message: "Invalid email or password." } as const;
  }

  writeStorage<AuthSession>(CURRENT_USER_KEY, {
    id: user.id,
    name: user.name,
    email: user.email,
  });

  return { success: true } as const;
}

export function resetUserPassword(input: { email: string; password: string }) {
  const email = normalizeEmail(input.email);
  const users = getUsers();
  const targetIndex = users.findIndex((item) => normalizeEmail(item.email) === email);

  if (targetIndex === -1) {
    return { success: false, message: "No account found for this email." } as const;
  }

  const updatedUsers = [...users];
  updatedUsers[targetIndex] = {
    ...updatedUsers[targetIndex],
    password: input.password,
  };

  writeStorage(USERS_KEY, updatedUsers);

  return { success: true } as const;
}
