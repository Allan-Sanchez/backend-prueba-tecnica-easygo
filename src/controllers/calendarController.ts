import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { daysInMonth } from "../utils/daysInMonth";
const prisma = new PrismaClient();

export const allCalendar = async (req: Request, res: Response) => {
  const calendar = await prisma.calendar.findMany();
  res.status(200).json(calendar);
};

export const createDate = async (req: Request, res: Response) => {
  const { birth, carnet, poetry } = req.body;
  const birthDate = new Date(birth);

  //
  let tempcompetitionDate = "";

  // delete birth of origina object
  delete req.body.birth;

  // add field createdAt
  const registerDate = Date.now();
  const createdAt = new Date(registerDate);

  // obtain the last element of the carnet
  const lastCharacter = carnet.split("").slice(-1);

  let currentDay = createdAt.getDate();
  let day = createdAt.getDate();
  let year = createdAt.getFullYear();
  let month = createdAt.getMonth() + 1;
  let dayValidate = createdAt.getDay();
  let daysMonth = daysInMonth(month, year);

  // scenario 1 compete 5 days after registration
  if (lastCharacter == "1" && poetry === "dramatica") {
    // compete 5 days later saturday and sunday do not count
    if (dayValidate === 6) {
      day = day + 6;
    } else if (dayValidate === 0) {
      day = day + 5;
    } else {
      day = day + 7;
    }
    if (day > daysMonth) {
      // subtract the days and the difference is the days of the following month
      day = currentDay - day;
      month++;
    }
    tempcompetitionDate = `${year}-${month}-${day}`;
  } else if (lastCharacter == "3" && poetry === "epica") {
    //compete on the last day of the month
    let lastDayOftheMonth = new Date(`${year}-${month}-${daysMonth}`);
    let validateDay = lastDayOftheMonth.getDay();

    if (validateDay === 6) {
      daysMonth = daysMonth - 1;
    }
    if (validateDay === 0) {
      daysMonth = daysMonth - 2;
    }
    tempcompetitionDate = `${year}-${month}-${daysMonth}`;
  } else {
    // scenario 3  date will be the last Friday of the week of enrollment
    switch (dayValidate) {
      case 6:
        day = day + 6;
        break;
      case 5:
        day = day + 7;
        break;
      case 4:
        day = day + 1;
        break;
      case 3:
        day = day + 2;
        break;
      case 2:
        day = day + 3;
        break;
      case 1:
        day = day + 4;
        break;
      case 0:
        day = day + 5;
        break;
    }

    if (day > daysMonth) {
      // subtract the days and the difference is the days of the following month
      day = currentDay - day;
      month++;
    }
    tempcompetitionDate = `${year}-${month}-${day}`;
  }

  const competitionDate = new Date(tempcompetitionDate);

  const data = { ...req.body, birthDate, createdAt, competitionDate };
  // save into DB
  const newCalendar = await prisma.calendar.create({ data });
  res.status(201).json(newCalendar);
};
