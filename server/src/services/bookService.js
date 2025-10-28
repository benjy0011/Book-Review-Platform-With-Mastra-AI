import { PrismaClient } from "@prisma/client";
import { mastra } from "../mastra/index.js";

const prisma = new PrismaClient();

export async function getAllBooks() {
  return prisma.book.findMany({
    include: { reviews: { include: { tags: true } } }
  });
}

export async function getBookWithReviews(bookId) {
  return prisma.book.findUnique({
    where: { id: bookId },
    include: { reviews: { include: { tags: true } } }
  });
}

export async function addReview(
  bookId,
  reviewerName,
  text,
  rating
) {
  const agent = mastra.getAgent("reviewAgent");

  const result = await agent.generate(text);

  const jsonMatch = result.text.match(/```json\s*([\s\S]*?)\s*```/);
  const jsonString = jsonMatch[1].trim();
  const { summary, sentiment, tags } = JSON.parse(jsonString);

  return prisma.review.create({
    data: {
      bookId,
      reviewerName,
      text,
      rating,
      summary,
      sentimentScore: sentiment,
      tags: {
        create: tags.map((t) => ({ name: t })),
      },
    },
    include: { tags: true },
  });
}

export async function searchForBooks(query) {
  if (!query) return prisma.book.findMany({
    include: {
      reviews: { include: { tags: true } }
    }
  });

  const lowerQuery = `%${query.toLowerCase()}%`;

  return await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: lowerQuery } },
        { author: { contains: lowerQuery } },
        { description: { contains: lowerQuery } },
        {
          reviews: {
            some: {
              OR: [
                { text: { contains: lowerQuery } },
                { summary: { contains: lowerQuery } },
              ],
            },
          },
        },
      ],
    },
    include: {
      reviews: { include: { tags: true } }
    }
  });
}