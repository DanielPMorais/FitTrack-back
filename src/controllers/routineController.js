import { mockRoutines } from '../data/mockData.js';

/**
 * GET /api/routines
 * Retorna todas as rotinas de treino
 */
export const getAllRoutines = (req, res) => {
  try {
    res.json(mockRoutines);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching routines',
      message: error.message 
    });
  }
};

/**
 * GET /api/routines/:routineId
 * Retorna uma rotina específica por ID
 */
export const getRoutineById = (req, res) => {
  try {
    const { routineId } = req.params;
    const routine = mockRoutines.find(r => r.id === routineId);
    
    if (!routine) {
      return res.status(404).json({ 
        error: 'Routine not found',
        message: `Routine with ID ${routineId} does not exist` 
      });
    }
    
    res.json(routine);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching routine',
      message: error.message 
    });
  }
};

