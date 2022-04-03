import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const allCalendar = async (req: Request, res: Response) => {
  const calendar = await prisma.calendar.findMany();
  res.status(200).json(calendar);
};

export const createDate = async (req: Request, res: Response) => {
  const { birth, carnet, poetry } = req.body;
  const birthDate = new Date(birth);
  let tempcompetitionDate = "";
  // delete birth
  delete req.body.birth;
  // add date created
  const registerDate = Date.now();
  const createdAt = new Date(registerDate);
  // const createdAt = new Date("2022-04-02");
  // console.log(createdAt);

  // condition date
  const lastCharacter = carnet.split("").slice(-1);

  if (lastCharacter == "1" && poetry === "dramatica") {
    // concursara 5 dias despues sabado y domingo no cuenta
    let day = createdAt.getDate();
    let year = createdAt.getFullYear();
    let month = createdAt.getMonth() + 1;
    let dayValidate = createdAt.getDay();
    // console.log(day);
    const dayMonth = diasEnUnMes(month, year);
    // console.log(dayMonth);
    // let nuevafecha  = g;
    if (dayValidate === 6) {
      day = day + 6;
      // console.log(day)
    }
    if (dayValidate === 0) {
      day = day + 7;
      // console.log(day)
    }
    if (day > dayMonth) {
      month++;
    }
    tempcompetitionDate = `${year}-${month}-${day}`;
  } else if (lastCharacter == "3" && poetry === "epica") {
    // concursara el ultimo dia del mes
    let createdYear = createdAt.getFullYear();
    let createMonth = createdAt.getMonth() + 1;
    let dayMonth = diasEnUnMes(createMonth, createdYear);
    let newDay = new Date(`${createdYear}-${createMonth}-${dayMonth}`);
    let validateDay = newDay.getDay();

    if (validateDay === 6) {
      dayMonth = dayMonth - 1;
    }
    if (validateDay === 0) {
      dayMonth = dayMonth - 2;
    }
    tempcompetitionDate = `${createdYear}-${createMonth}-${dayMonth}`;
  } else {
    // TODO:: para dos los demas sera el ultimo viernes del mes
    let day = createdAt.getDate();
    let year = createdAt.getFullYear();
    let month = createdAt.getMonth() + 1;
    let dayValidate = createdAt.getDay();
    const dayMonth = diasEnUnMes(month, year);

    if (dayValidate === 6) {
      day = day + 6;
    }
    if (dayValidate === 0) {
      day = day + 7;
    }
    if (day > dayMonth) {
      month++;
    }
    tempcompetitionDate = `${year}-${month}-${day}`;
  }

  const competitionDate = new Date(tempcompetitionDate);
  console.log(competitionDate);

  const data = { ...req.body, birthDate, createdAt, competitionDate };
  const newCalendar = await prisma.calendar.create({ data });
  console.log(newCalendar);
  res.status(201).json(newCalendar);
};

//TODO: create update method

function diasEnUnMes(mes: number, año: number) {
  return new Date(año, mes, 0).getDate();
}
