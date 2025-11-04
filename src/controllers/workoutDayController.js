import { WorkoutDay, Exercise, Routine } from '../models/index.js';

/**
 * GET /api/workout-days/:workoutId
 * Retorna um dia de treino específico por ID (com todos os exercícios)
 * Verifica se o workout day pertence a uma rotina do usuário autenticado
 */
export const getWorkoutDayById = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const userId = req.userId;

    const workoutDay = await WorkoutDay.findById(workoutId).lean();

    if (!workoutDay) {
      return res.status(404).json({
        error: 'Workout day not found',
        message: `Workout day with ID ${workoutId} does not exist`,
      });
    }

    // Verificar se a rotina pertence ao usuário autenticado
    const routine = await Routine.findOne({ _id: workoutDay.routineId, userId }).lean();
    if (!routine) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to access this workout day',
      });
    }

    // Buscar exercícios
    const exercises = await Exercise.find({ workoutDayId: workoutDay._id })
      .sort({ order: 1 })
      .lean();

    // Formatar data de lastCompleted
    let lastCompleted = null;
    if (workoutDay.lastCompleted) {
      const date = new Date(workoutDay.lastCompleted);
      lastCompleted = date.toLocaleDateString('pt-BR');
    }

    res.json({
      id: workoutDay._id.toString(),
      title: workoutDay.title,
      description: workoutDay.description,
      lastCompleted: lastCompleted,
      exercises: exercises.map((ex) => ({
        id: ex._id.toString(),
        title: ex.title,
        series: ex.series,
        load: ex.load,
        interval: ex.interval,
        videoUrl: ex.videoUrl,
      })),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching workout day',
      message: error.message,
    });
  }
};

/**
 * PATCH /api/workout-days/:workoutId/complete
 * Marca um treino como completado (atualiza lastCompleted)
 * Verifica se o workout day pertence a uma rotina do usuário autenticado
 */
export const completeWorkoutDay = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const userId = req.userId;

    const workoutDay = await WorkoutDay.findById(workoutId);

    if (!workoutDay) {
      return res.status(404).json({
        error: 'Workout day not found',
        message: `Workout day with ID ${workoutId} does not exist`,
      });
    }

    // Verificar se a rotina pertence ao usuário autenticado
    const routine = await Routine.findOne({ _id: workoutDay.routineId, userId });
    if (!routine) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to complete this workout day',
      });
    }

    // Atualiza a data de último completado
    workoutDay.lastCompleted = new Date();
    await workoutDay.save();

    // Buscar exercícios para retornar objeto completo
    const exercises = await Exercise.find({ workoutDayId: workoutDay._id })
      .sort({ order: 1 })
      .lean();

    const formattedDate = workoutDay.lastCompleted.toLocaleDateString('pt-BR');

    res.json({
      message: 'Workout day marked as completed',
      workoutDay: {
        id: workoutDay._id.toString(),
        title: workoutDay.title,
        description: workoutDay.description,
        lastCompleted: formattedDate,
        exercises: exercises.map((ex) => ({
          id: ex._id.toString(),
          title: ex.title,
          series: ex.series,
          load: ex.load,
          interval: ex.interval,
          videoUrl: ex.videoUrl,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error completing workout day',
      message: error.message,
    });
  }
};
