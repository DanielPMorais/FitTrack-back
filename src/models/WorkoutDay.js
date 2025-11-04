import mongoose from 'mongoose';

const workoutDaySchema = new mongoose.Schema(
  {
    routineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Routine',
      required: [true, 'ID da rotina é obrigatório'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Título do treino é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    lastCompleted: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto para melhor performance
workoutDaySchema.index({ routineId: 1, createdAt: -1 });

export default mongoose.model('WorkoutDay', workoutDaySchema);

