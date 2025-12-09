import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role?: string;   
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;     
  }
}


export interface LoginProps {
    email: string;
    pass: string;
}


export interface ProductProps {
    name: string;
    category: string;
    price: number;
    image: string | File;
    stock: number;
    description: string;
    createdAt: string;
}