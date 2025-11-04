import { findWorkoutDayById, mockRoutines } from '../data/mockData.js';

/**
 * GET /api/workout-days/:workoutId
 * Retorna um dia de treino específico por ID (com todos os exercícios)
 */
export const getWorkoutDayById = (req, res) => {
  try {
    const { workoutId } = req.params;
    const workoutDay = findWorkoutDayById(workoutId);
    
    if (!workoutDay) {
      return res.status(404).json({ 
        error: 'Workout day not found',
        message: `Workout day with ID ${workoutId} does not exist` 
      });
    }
    
    res.json(workoutDay);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching workout day',
      message: error.message 
    });
  }
};

/**
 * PATCH /api/workout-days/:workoutId/complete
 * Marca um treino como completado (atualiza lastCompleted)
 */
export const completeWorkoutDay = (req, res) => {
  try {
    const { workoutId } = req.params;
    const workoutDay = findWorkoutDayById(workoutId);
    
    if (!workoutDay) {
      return res.status(404).json({ 
        error: 'Workout day not found',
        message: `Workout day with ID ${workoutId} does not exist` 
      });
    }
    
    // Atualiza a data de último completado
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');
    workoutDay.lastCompleted = formattedDate;
    
    res.json({
      message: 'Workout day marked as completed',
      workoutDay: workoutDay
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error completing workout day',
      message: error.message 
    });
  }
};

