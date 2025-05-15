import { PrismaClient } from "../generated/prisma";

declare global {
  // 전역변수 타입 추가
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
