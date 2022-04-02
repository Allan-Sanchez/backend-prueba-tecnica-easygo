import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const allCalendar = async (req: Request, res: Response) => {
  const calendar = await prisma.calendar.findMany();
  res.status(200).json(calendar);
};

export const createDate = async (req: Request, res: Response) => {
  // TODO:: Create condition for date
  // const data = req.body;
  const newCalendar = await prisma.calendar.create({ data: req.body });
  console.log(newCalendar);
  res.status(201).json(newCalendar);
};

//TODO: create update method
