const asyncWrapper = require("../middelware/asyncWrapper");
const Task = require("../models/tasks");
const mongoose = require("mongoose");
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req,res,next) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});
const getTask = asyncWrapper(async (req,res,next) => {
  const task = await Task.findOne({ _id: req.params.taskId });

  if (!task) {

   return next(createCustomError(`No task with id : ${req.params.taskId}`, 404)) 
    ;
  }
  res.status(200).json(task);
});
const createTask = asyncWrapper(async (req,res,next) => {
  const exists = Task.findOne({ name: req.body.name });
  exists && res.status(302).json({error:"task already exists"})

  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req,res,next) => {
  req.body.name &&
    req.body.complited &&
     next(createCustomError(`No task with id : ${req.params.taskId}`, 404))

  const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
    new: true,
    runValidators: true,
    //   overwrite:true  this replaces all the object
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.taskId}`, 404))
  }

  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req,res,next) => {
  const task = await Task.findByIdAndDelete({ _id: req.params.taskId });

  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.taskId}`, 404))
v
  }

  res.status(200).json({ msg: "task deleted" });
});
module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
