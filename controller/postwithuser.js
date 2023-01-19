const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const prisma = new PrismaClient();
const appConst = require("../constant");

const add = async (req, res) => {
  try {
    const resp = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        posts: {
          create: {
            title: req.body.title,
            content: req.body.content,
            published: req.body.published,
          },
          // connectOrCreate: {
          //   where: {
          //     email: req.body.email,
          //   },
          // },
        },
      },
    });
    res.status(200).json({
      status: appConst.status.success,
      response: resp,
      Message: "record created in db",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      Message: "record not created in db",
    });
  }
};
const fetch = async (req, res) => {
  try {
    const resp2 = await prisma.user.findMany({
      include: { posts: true },
    });
    res.status(200).json({
      status: appConst.status.success,
      response: resp2,
      message: "fetching all records",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: "record is not fetching...",
    });
  }
};
const recordupdate = async (req, res) => {
  try {
    const getUser = await prisma.user.update({
      where: {
        uid: req.body.uid,
      },
      data: {
        posts: {
          connect: {
            id: req.body.id,
          },
          create: {
            title: req.body.title,
          },
        },
      },
      include: {
        posts: true,
      },
    });
    res.status(200).json({
      status: appConst.status.success,
      response: getUser,
      message: "record is connectOrCreate successfully in db",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: "record is not connectOrCreate successfully ",
    });
  }
};

const remove = async (req, res) => {
  try {
    const record = await prisma.user.delete({
      where: {
        uid: req.body.uid,
        // id: req.body.id,
      },
      include: {
        posts: true,
      },
    });
    res.status(200).json({
      status: appConst.status.success,
      response: record,
      message: "record remove from db",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: appConst.status.fail,
      response: null,
      message: "record not deleted",
    });
  }
};

module.exports = {
  add,
  fetch,
  recordupdate,
  remove,
};
