import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaClient, WordType } from '../generated/prisma/client';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@udemy.com' },
    update: {},
    create: {
      email: 'admin@udemy.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      name: 'Dương Nhật Thành',
      password: await bcrypt.hash('123456', 12),
      role: 'USER',
      status: 'ACTIVE',
      profile: {
        create: {
          displayName: 'Dương Nhật Thành',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        },
      },
      notebook: {
        create: {},
      },
    },
  });

  const course = await prisma.course.upsert({
    where: { id: 'course-toeic-001' },
    update: {},
    create: {
      id: 'course-toeic-001',
      title: 'TOEIC 600+',
      subtitle: 'Chinh phục TOEIC với 600+ từ vựng thiết yếu',
      description:
        'Khóa học từ vựng TOEIC dành cho người mới bắt đầu đến trung cấp.',
      imageUrl:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
      isPremium: false,
      isPublished: true,
      orderIndex: 1,
    },
  });

  const course2 = await prisma.course.upsert({
    where: { id: 'course-thpt-001' },
    update: {},
    create: {
      id: 'course-thpt-001',
      title: 'Từ vựng THPT Quốc gia',
      subtitle: 'Ôn thi THPT với 500+ từ vựng quan trọng',
      description:
        'Tổng hợp từ vựng tiếng Anh thường gặp trong đề thi THPT Quốc gia.',
      imageUrl:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
      isPremium: false,
      isPublished: true,
      orderIndex: 2,
    },
  });

  const topic1 = await prisma.topic.upsert({
    where: { id: 'topic-office-001' },
    update: {},
    create: {
      id: 'topic-office-001',
      courseId: course.id,
      title: 'Unit 1 - Văn phòng',
      subtitle: 'Từ vựng về môi trường văn phòng',
      imageUrl:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      orderIndex: 1,
      isPremium: false,
    },
  });

  const topic2 = await prisma.topic.upsert({
    where: { id: 'topic-travel-001' },
    update: {},
    create: {
      id: 'topic-travel-001',
      courseId: course.id,
      title: 'Unit 2 - Du lịch',
      subtitle: 'Từ vựng về du lịch và khách sạn',
      imageUrl:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
      orderIndex: 2,
      isPremium: false,
    },
  });

  const wordsData = [
    {
      id: 'word-office-001',
      term: 'office',
      phonetic: '/ˈɒfɪs/',
      audioUrl:
        'https://ssl.gstatic.com/dictionary/static/sounds/oxford/office--_gb_1.mp3',
      definitions: [
        { wordType: WordType.NOUN, meaning: 'văn phòng, phòng làm việc' },
      ],
      examples: [
        {
          sentence: 'I work in a modern office.',
          translation: 'Tôi làm việc trong một văn phòng hiện đại.',
        },
      ],
      topicId: topic1.id,
      orderIndex: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300',
    },
    {
      id: 'word-meeting-001',
      term: 'meeting',
      phonetic: '/ˈmiːtɪŋ/',
      audioUrl:
        'https://ssl.gstatic.com/dictionary/static/sounds/oxford/meeting--_gb_1.mp3',
      definitions: [
        { wordType: WordType.NOUN, meaning: 'cuộc họp, buổi gặp mặt' },
      ],
      examples: [
        {
          sentence: 'We have a meeting every Monday.',
          translation: 'Chúng tôi có cuộc họp vào mỗi thứ Hai.',
        },
      ],
      topicId: topic1.id,
      orderIndex: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300',
    },
    {
      id: 'word-deadline-001',
      term: 'deadline',
      phonetic: '/ˈdedlaɪn/',
      audioUrl: '',
      definitions: [{ wordType: WordType.NOUN, meaning: 'hạn chót, thời hạn' }],
      examples: [
        {
          sentence: 'The deadline for this project is Friday.',
          translation: 'Hạn chót của dự án này là thứ Sáu.',
        },
      ],
      topicId: topic1.id,
      orderIndex: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=300',
    },
    {
      id: 'word-hotel-001',
      term: 'hotel',
      phonetic: '/həʊˈtel/',
      audioUrl: '',
      definitions: [{ wordType: WordType.NOUN, meaning: 'khách sạn' }],
      examples: [
        {
          sentence: 'We stayed at a five-star hotel.',
          translation: 'Chúng tôi ở tại một khách sạn năm sao.',
        },
      ],
      topicId: topic2.id,
      orderIndex: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300',
    },
    {
      id: 'word-passport-001',
      term: 'passport',
      phonetic: '/ˈpɑːspɔːt/',
      audioUrl: '',
      definitions: [{ wordType: WordType.NOUN, meaning: 'hộ chiếu' }],
      examples: [
        {
          sentence: "Don't forget to bring your passport.",
          translation: 'Đừng quên mang theo hộ chiếu của bạn.',
        },
      ],
      topicId: topic2.id,
      orderIndex: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=300',
    },
  ];

  for (const wordData of wordsData) {
    const { topicId, orderIndex, imageUrl, definitions, examples, ...word } =
      wordData;

    const createdWord = await prisma.word.upsert({
      where: { term: word.term },
      update: {},
      create: {
        id: word.id,
        term: word.term,
        phonetic: word.phonetic,
        audioUrl: word.audioUrl || null,
        definitions: { create: definitions },
        examples: { create: examples },
      },
    });

    await prisma.topicWord.upsert({
      where: {
        topicId_wordId: {
          topicId,
          wordId: createdWord.id,
        },
      },
      update: {},
      create: {
        topicId,
        wordId: createdWord.id,
        orderIndex,
        imageUrl: imageUrl || null,
      },
    });
  }

  await prisma.courseEnrollment.upsert({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      courseId: course.id,
    },
  });

  // ===== 7. PREMIUM PLANS =====
  const plans = [
    {
      id: 'plan-1month',
      name: 'Premium 1 Tháng',
      duration: 'ONE_MONTH' as const,
      price: 99000,
      description: 'Truy cập toàn bộ khóa học Premium trong 1 tháng',
    },
    {
      id: 'plan-3months',
      name: 'Premium 3 Tháng',
      duration: 'THREE_MONTHS' as const,
      price: 250000,
      description: 'Tiết kiệm 16% so với gói 1 tháng',
    },
    {
      id: 'plan-1year',
      name: 'Premium 1 Năm',
      duration: 'ONE_YEAR' as const,
      price: 798000,
      description: 'Tiết kiệm 33% so với gói 1 tháng',
    },
  ];

  for (const plan of plans) {
    await prisma.premiumPlan.upsert({
      where: { id: plan.id },
      update: {},
      create: plan,
    });
  }
}

main()
  .catch((e) => {
    console.error('Seed thất bại:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
