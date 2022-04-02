import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const allCalendar = async (req: Request, res: Response) => {
  const calendar = await prisma.calendar.findMany();
  res.status(200).json(calendar);
};

export const createDate = async (req: Request, res: Response) => {
  const { birth } = req.body;
  const birthDate = new Date(birth);

  // delete birth
  delete req.body.birth;
  // TODO:: Create condition for date
  const createdAt = new Date("2020-10-5");
  const competitionDate = new Date("2022-11-1");
  const data = { ...req.body, birthDate, createdAt, competitionDate };
  console.log(data);
  // const data = req.body;
  const newCalendar = await prisma.calendar.create({ data });
  console.log(newCalendar);
  res.status(201).json(newCalendar);
};

//TODO: create update method
