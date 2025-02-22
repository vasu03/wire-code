import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    credits: integer().default(0)
});

export const codeGenerationTable = pgTable("codeGeneration", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uid: varchar().notNull(),
    imgUrl: varchar().notNull(),
    aiModel: varchar().notNull(),
    description: varchar(),
    code: json(),
    createdBy: varchar().notNull()
});