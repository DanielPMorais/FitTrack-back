import dotenv from 'dotenv';
import { connectDatabase } from '../config/database.js';
import { User, Routine, WorkoutDay, Exercise } from '../models/index.js';
import { mockRoutines } from '../data/mockData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Conectar ao banco
    await connectDatabase();

    console.log('🌱 Iniciando seed do banco de dados...\n');

    // Limpar dados existentes (opcional - comentar se não quiser limpar)
    console.log('🗑️  Limpando dados existentes...');
    await Exercise.deleteMany({});
    await WorkoutDay.deleteMany({});
    await Routine.deleteMany({});
    await User.deleteMany({});

    // Criar usuário admin
    console.log('👤 Criando usuário admin...');
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'Admin@123',
    });
    console.log(`✅ Usuário admin criado: ${admin.email}\n`);

    // Criar rotinas e dados relacionados
    for (let i = 0; i < mockRoutines.length; i++) {
      const mockRoutine = mockRoutines[i];
      
      console.log(`📋 Criando rotina: ${mockRoutine.title}...`);
      
      // Criar rotina
      const routine = await Routine.create({
        userId: admin._id,
        title: mockRoutine.title,
        dateRange: mockRoutine.dateRange,
        icon: mockRoutine.icon,
      });

      // Criar workout days
      for (let j = 0; j < mockRoutine.days.length; j++) {
        const mockDay = mockRoutine.days[j];
        
        console.log(`  🏋️  Criando treino: ${mockDay.title}...`);
        
        // Converter string de data para Date
        let lastCompletedDate = null;
        if (mockDay.lastCompleted) {
          // Formato: "20/01/2025"
          const [day, month, year] = mockDay.lastCompleted.split('/');
          lastCompletedDate = new Date(year, month - 1, day);
        }

        const workoutDay = await WorkoutDay.create({
          routineId: routine._id,
          title: mockDay.title,
          description: mockDay.description || '',
          lastCompleted: lastCompletedDate,
        });

        // Criar exercícios
        if (mockDay.exercises && mockDay.exercises.length > 0) {
          for (let k = 0; k < mockDay.exercises.length; k++) {
            const mockExercise = mockDay.exercises[k];
            
            await Exercise.create({
              workoutDayId: workoutDay._id,
              title: mockExercise.title,
              series: mockExercise.series,
              load: mockExercise.load,
              interval: mockExercise.interval,
              videoUrl: mockExercise.videoUrl,
              order: k,
            });
          }
          console.log(`    ✅ ${mockDay.exercises.length} exercícios criados`);
        }
      }
      
      console.log(`✅ Rotina "${mockRoutine.title}" criada com sucesso!\n`);
    }

    // Resumo
    const userCount = await User.countDocuments();
    const routineCount = await Routine.countDocuments();
    const workoutDayCount = await WorkoutDay.countDocuments();
    const exerciseCount = await Exercise.countDocuments();

    console.log('\n📊 Resumo do seed:');
    console.log(`   👤 Usuários: ${userCount}`);
    console.log(`   📋 Rotinas: ${routineCount}`);
    console.log(`   🏋️  Dias de treino: ${workoutDayCount}`);
    console.log(`   💪 Exercícios: ${exerciseCount}`);
    console.log('\n✅ Seed concluído com sucesso!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
};

// Executar seed
seedDatabase();

