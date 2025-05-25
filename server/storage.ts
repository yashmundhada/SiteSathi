import { 
  users, 
  contactRequests, 
  waitlistSignups,
  type User, 
  type InsertUser,
  type ContactRequest,
  type InsertContactRequest,
  type WaitlistSignup,
  type InsertWaitlistSignup
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
  getContactRequests(): Promise<ContactRequest[]>;
  getWaitlistSignups(): Promise<WaitlistSignup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactRequests: Map<number, ContactRequest>;
  private waitlistSignups: Map<number, WaitlistSignup>;
  private currentUserId: number;
  private currentContactId: number;
  private currentWaitlistId: number;

  constructor() {
    this.users = new Map();
    this.contactRequests = new Map();
    this.waitlistSignups = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentWaitlistId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactRequest(insertRequest: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const contactRequest: ContactRequest = {
      ...insertRequest,
      id,
      createdAt: new Date(),
    };
    this.contactRequests.set(id, contactRequest);
    return contactRequest;
  }

  async createWaitlistSignup(insertSignup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    const id = this.currentWaitlistId++;
    const waitlistSignup: WaitlistSignup = {
      ...insertSignup,
      id,
      createdAt: new Date(),
    };
    this.waitlistSignups.set(id, waitlistSignup);
    return waitlistSignup;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contactRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getWaitlistSignups(): Promise<WaitlistSignup[]> {
    return Array.from(this.waitlistSignups.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
