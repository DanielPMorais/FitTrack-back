import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    workoutDayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkoutDay',
      required: [true, 'ID do dia de treino é obrigatório'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Título do exercício é obrigatório'],
      trim: true,
    },
    series: {
      type: String,
      trim: true,
    },
    load: {
      type: String,
      trim: true,
    },
    interval: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto para melhor performance e ordenação
exerciseSchema.index({ workoutDayId: 1, order: 1 });

export default mongoose.model('Exercise', exerciseSchema);

