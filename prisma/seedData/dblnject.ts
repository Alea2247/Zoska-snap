// npm install --save-dev tsx

// npx tsx prisma/seedData/dbInject.ts

import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Read and parse the seed data
  const data = JSON.parse(fs.readFileSync('prisma/seedData/seed-data.json', 'utf8'));

  for (const item of data) {
    try {
      // Use upsert to handle unique constraint violation for the email
      const createdUser = await prisma.user.upsert({
        where: { email: item.email },  // Check for an existing user with the same email
        update: {},  // No updates needed, just skip if exists
        create: {
          name: item.name,
          email: item.email,
          emailVerified: item.emailVerified,
          image: item.image,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
      });

      console.log(`User ${createdUser.name} (email: ${createdUser.email}) upserted.`);

      // Create profile only if it exists in the data
      if (item.profile) {
        await prisma.profile.upsert({
          where: { userId: createdUser.id },  // Use userId to check if the profile exists
          update: {},  // No updates needed for the profile, just skip if exists
          create: {
            userId: createdUser.id,
            bio: item.profile.bio,
            avatarUrl: item.profile.avatarUrl,
            location: item.profile.location,
            interests: item.profile.interests,
            createdAt: item.profile.createdAt,
            updatedAt: item.profile.updatedAt
          }
        });
        console.log(`Profile for ${createdUser.name} created/updated.`);
      }

      // Create posts using createMany and skip duplicates
      if (item.posts && item.posts.length > 0) {
        await prisma.post.createMany({
          data: item.posts.map((p: any) => ({
            userId: createdUser.id,  // Link posts to the created user
            imageUrl: p.imageUrl,
            caption: p.caption,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
          })),
          skipDuplicates: true  // Skip duplicate posts
        });
        console.log(`Posts for ${createdUser.name} created.`);
      }

    } catch (error) {
      console.error(`Error processing user with email ${item.email}:`, error);
    }
  }

  console.log('Database seeded successfully!');
}

// Run the seeding script
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});