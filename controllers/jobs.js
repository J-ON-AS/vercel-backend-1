const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors');
const getJob = async (req, res) => {
  const { user: { userId }, params: { dhoodh: jobId } } = req

  const job = await Job.findOne({
    _id: jobId, createdBy: userId
  })
  if (!job) {
    throw new NotFoundError(`No user found with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job })
}
const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}
const deleteJob = async (req, res) => {
  const {
    user:{userId},
    params:{dhoodh:shaash}
} = req
const job = await Job.findByIdAndRemove({_id:shaash,createdBy:userId})
  if(!job){
    throw new NotFoundError(`Cannot find job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send(`Job with id ${shaash} and userId : ${userId} is deleted`)
}
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { dhoodh: paneer },
    user: { userId }
  } = req
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position cannot be empty')
  }
  const job = await Job.findByIdAndUpdate({ _id: paneer, createdBy: userId }, req.body, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job });
}

module.exports = {
  getJob,
  getAllJobs,
  deleteJob,
  updateJob,
  createJob,
}