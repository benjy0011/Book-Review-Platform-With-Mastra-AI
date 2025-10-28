import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.reviewTag.deleteMany();
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();

  console.log("🧹 Cleared existing data...")

  const book1 = await prisma.book.create({
    data: {
      title: "Atomic Habits",
      author: "James Clear",
      description: "A guide to building good habits and breaking bad ones.",
      coverImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBYvW4Cg6nzTbqlf-loNRoOjZWq8FkNtg_mQ&s",
    },
  })

  const book2 = await prisma.book.create({
    data: {
      title: "Deep Work",
      author: "Cal Newport",
      description: "Rules for focused success in a distracted world.",
      coverImageUrl: "https://m.media-amazon.com/images/I/71din4TLubL._UF1000,1000_QL80_.jpg",
    },
  })

  const book3 = await prisma.book.create({
    data: {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      description: "Powerful lessons in personal change.",
      coverImageUrl: "https://mphonline.com/cdn/shop/files/9781471195204_mph_The7HabitsOfHighlyEffectivePeople.jpg?v=1702540202",
    },
  })

  const book4 = await prisma.book.create({
    data: {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      description: "A counterintuitive approach to living a good life.",
      coverImageUrl: "https://mphonline.com/cdn/shop/products/9780062641540.jpg?v=1657248789",
    },
  })

  const book5 = await prisma.book.create({
    data: {
      title: "Can't Hurt Me",
      author: "David Goggins",
      description: "Master your mind and defy the odds.",
      coverImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34-Vpid5ZxOdyKVYVOl89-NaOcF2iQ2lq4w&s",
    },
  })


  const review1 = await prisma.review.create({
    data: {
      bookId: book1.id,
      reviewerName: "Benjy",
      text: "This book completely changed how I approach self-improvement.",
      rating: 5,
      summary: "Transformative",
      sentimentScore: "Positive",
      tags: {
        create: [
          { name: "Motivational" },
          { name: "Self-Help" },
        ],
      },
    },
  })

  const review2 = await prisma.review.create({
    data: {
      bookId: book2.id,
      reviewerName: "Alice",
      text: "A bit dense, but the productivity tips are very practical.",
      rating: 4,
      summary: "Insightful",
      sentimentScore: "Neutral",
      tags: {
        create: [
          { name: "Productivity" },
          { name: "Focus" },
        ],
      },
    },
  })

  console.log("✅ Seeded books and reviews successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
