import express from 'express';
import {
  insertGrade,
  updateGrade,
  deleteGrade,
  getGrade,
  getTotalGrades,
  getMeanGrades,
  getBestGrades,
} from '../controllers/gradesController.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const grade = req.body;
    res.send(await insertGrade(grade, next));
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const gradeToUpdate = req.body;
    res.send(await updateGrade(gradeToUpdate, next));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteGrade(parseInt(req.params.id));
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await getGrade(parseInt(req.params.id)));
  } catch (err) {
    next(err);
  }
});

router.get('/total/:student/:subject', async (req, res, next) => {
  try {
    res.send(await getTotalGrades(req.params.student, req.params.subject));
  } catch (err) {
    next(err);
  }
});

router.get('/mean/:subject/:type', async (req, res, next) => {
  try {
    res.send(await getMeanGrades(req.params.subject, req.params.type));
  } catch (err) {
    next(err);
  }
});

router.get('/best/:subject/:type', async (req, res, next) => {
  try {
    res.send(await getBestGrades(req.params.subject, req.params.type, 3));
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
