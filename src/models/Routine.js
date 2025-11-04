import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'ID do usuário é obrigatório'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Título da rotina é obrigatório'],
      trim: true,
    },
    dateRange: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: '💪',
    },
  },
  {
    timestamps: true,
  }
);

// Índice composto para melhor performance
routineSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Routine', routineSchema);

