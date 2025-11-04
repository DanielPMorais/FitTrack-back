// Dados mock baseados no frontend
export const mockRoutines = [
  {
    id: "routine-1",
    title: "HIPERTROFIA MASCULINO INICIANTE",
    dateRange: "21/01/2025 - 21/03/2025",
    icon: "💪",
    days: [
      {
        id: "day-1-1",
        title: "Treino A",
        description: "Peito, Ombro e Tríceps",
        lastCompleted: "20/01/2025",
        exercises: [
          {
            id: "ex-1-1-1",
            title: "Supino Maquina (Pegada Neutra)",
            series: "3x12-15",
            load: "35kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-1-1-2",
            title: "Crucifixo Máquina",
            series: "3x12-15",
            load: "30kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-1-1-3",
            title: "Supino Inclinado com Halteres",
            series: "3x12-15",
            load: "12kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
        ],
      },
      {
        id: "day-1-2",
        title: "Treino B",
        description: "Costas e Bíceps",
        lastCompleted: "19/01/2025",
        exercises: [],
      },
      {
        id: "day-1-3",
        title: "Treino C",
        description: "Pernas",
        lastCompleted: "18/01/2025",
        exercises: [],
      },
    ],
  },
  {
    id: "routine-2",
    title: "TREINO ABC",
    dateRange: "26/09/2024 - 26/10/2024",
    icon: "🏋️",
    days: [
      {
        id: "day-2-1",
        title: "Treino 1",
        description: "Peito / Tríceps",
        lastCompleted: "14/04/2025",
        exercises: [
          {
            id: "ex-2-1-1",
            title: "Supino Maquina (Pegada Neutra)",
            series: "3x12-15",
            load: "35kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-2-1-2",
            title: "Crucifixo Máquina",
            series: "3x12-15",
            load: "30kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-2-1-3",
            title: "Supino Inclinado com Halteres",
            series: "3x12-15",
            load: "12kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
        ],
      },
      {
        id: "day-2-2",
        title: "Treino 2",
        description: "Costas e Bíceps",
        lastCompleted: "15/04/2025",
        exercises: [
          {
            id: "ex-2-2-1",
            title: "Puxada Frontal",
            series: "3x12",
            load: "50kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-2-2-2",
            title: "Remada Curvada",
            series: "3x12",
            load: "40kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
        ],
      },
      {
        id: "day-2-3",
        title: "Treino 3",
        description: "Inferiores e Ombro",
        lastCompleted: "20/01/2025",
        exercises: [
          {
            id: "ex-2-3-1",
            title: "Agachamento Livre",
            series: "3x10",
            load: "60kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-2-3-2",
            title: "Leg Press",
            series: "3x12",
            load: "120kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
          {
            id: "ex-2-3-3",
            title: "Desenvolvimento c/ Halteres",
            series: "3x10",
            load: "14kg",
            interval: "60s",
            videoUrl: "url_video_placeholder",
          },
        ],
      },
    ],
  },
];

// Função auxiliar para encontrar um workout day por ID
export function findWorkoutDayById(workoutId) {
  for (const routine of mockRoutines) {
    for (const day of routine.days) {
      if (day.id === workoutId) {
        return day;
      }
    }
  }
  return null;
}

