import { Routine, WorkoutDay, Exercise } from '../models/index.js';

/**
 * GET /api/routines
 * Retorna todas as rotinas de treino
 */
export const getAllRoutines = async (req, res) => {
  try {
    const routines = await Routine.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    // Transformar para o formato esperado pelo frontend
    const routinesWithDays = await Promise.all(
      routines.map(async (routine) => {
        const workoutDays = await getWorkoutDaysForRoutine(routine._id);
        return {
          id: routine._id.toString(),
          title: routine.title,
          dateRange: routine.dateRange,
          icon: routine.icon,
          days: workoutDays,
        };
      })
    );

    res.json(routinesWithDays);
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching routines',
      message: error.message,
    });
  }
};

/**
 * GET /api/routines/:routineId
 * Retorna uma rotina específica por ID
 */
export const getRoutineById = async (req, res) => {
  try {
    const { routineId } = req.params;
    const routine = await Routine.findById(routineId)
      .populate('userId', 'name email')
      .lean();

    if (!routine) {
      return res.status(404).json({
        error: 'Routine not found',
        message: `Routine with ID ${routineId} does not exist`,
      });
    }

    const workoutDays = await getWorkoutDaysForRoutine(routine._id);

    res.json({
      id: routine._id.toString(),
      title: routine.title,
      dateRange: routine.dateRange,
      icon: routine.icon,
      days: workoutDays,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching routine',
      message: error.message,
    });
  }
};

/**
 * Função auxiliar para buscar workout days de uma rotina
 */
async function getWorkoutDaysForRoutine(routineId) {
  const workoutDays = await WorkoutDay.find({ routineId })
    .sort({ createdAt: 1 })
    .lean();

  const workoutDaysWithExercises = await Promise.all(
    workoutDays.map(async (day) => {
      const exercises = await Exercise.find({ workoutDayId: day._id })
        .sort({ order: 1 })
        .lean();

      // Formatar data de lastCompleted
      let lastCompleted = null;
      if (day.lastCompleted) {
        const date = new Date(day.lastCompleted);
        lastCompleted = date.toLocaleDateString('pt-BR');
      }

      return {
        id: day._id.toString(),
        title: day.title,
        description: day.description,
        lastCompleted: lastCompleted,
        exercises: exercises.map((ex) => ({
          id: ex._id.toString(),
          title: ex.title,
          series: ex.series,
          load: ex.load,
          interval: ex.interval,
          videoUrl: ex.videoUrl,
        })),
      };
    })
  );

  return workoutDaysWithExercises;
}
