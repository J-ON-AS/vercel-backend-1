const express = require('express');
const router = express.Router();

const { getJob, getAllJobs, deleteJob, updateJob, createJob } = require('../controllers/jobs');
router.route('/').get(getAllJobs).post(createJob);
router.route('/:dhoodh').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;