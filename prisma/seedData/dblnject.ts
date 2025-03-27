// npm install --save-dev tsx

// npx tsx prisma/seedData/dbInject.ts

import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const seedData = JSON.parse(fs.readFileSync('prisma/seedData/seed-data.json', 'utf8'));
  const users = seedData.users || [];
  const follows = seedData.follows || [];
  const likes = seedData.likes || [];
  const commentLikes = seedData.commentLikes || [];
  const bookmarks = seedData.bookmarks || [];

  console.log(`Starting database seed with ${users.length} users...`);

  try {
    // First, create all users
    for (const item of users) {
      console.log(`Creating user: ${item.name}`);

      // Create user
      await prisma.user.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          email: item.email,
          emailVerified: item.emailVerified ? new Date(item.emailVerified) : null,
          image: item.image,
          updatedAt: new Date(item.updatedAt)
        },
        create: {
          id: item.id,
          name: item.name,
          email: item.email,
          emailVerified: item.emailVerified ? new Date(item.emailVerified) : null,
          image: item.image,
          createdAt: new Date(item.createdAt || new Date()),
          updatedAt: new Date(item.updatedAt)
        }
      });

      // Create profile if exists
      if (item.profile) {
        console.log(`Creating profile for: ${item.name}`);
        await prisma.profile.upsert({
          where: { id: item.profile.id },
          update: {
            bio: item.profile.bio,
            avatarUrl: item.profile.avatarUrl,
            location: item.profile.location,
            interests: item.profile.interests || [],
            updatedAt: new Date(item.profile.updatedAt)
          },
          create: {
            id: item.profile.id,
            userId: item.profile.userId,
            bio: item.profile.bio,
            avatarUrl: item.profile.avatarUrl,
            location: item.profile.location,
            interests: item.profile.interests || [],
            createdAt: new Date(item.profile.createdAt || new Date()),
            updatedAt: new Date(item.profile.updatedAt)
          }
        });
      }

      // Create posts
      if (item.posts && item.posts.length > 0) {
        console.log(`Creating ${item.posts.length} posts for: ${item.name}`);
        for (const post of item.posts) {
          await prisma.post.upsert({
            where: { id: post.id },
            update: {
              imageUrl: post.imageUrl,
              caption: post.caption,
              tags: post.tags || [],
              updatedAt: new Date(post.updatedAt)
            },
            create: {
              id: post.id,
              userId: item.id,
              imageUrl: post.imageUrl,
              caption: post.caption,
              tags: post.tags || [],
              createdAt: new Date(post.createdAt || new Date()),
              updatedAt: new Date(post.updatedAt)
            }
          });
        }
      }

      // Create comments
      if (item.comments && item.comments.length > 0) {
        console.log(`Creating ${item.comments.length} comments for: ${item.name}`);
        for (const comment of item.comments) {
          // Check if the referenced post exists
          try {
            const postExists = await prisma.post.findUnique({
              where: { id: comment.postId }
            });

            if (postExists) {
              await prisma.comment.upsert({
                where: { id: comment.id },
                update: {
                  content: comment.content,
                  postId: comment.postId,
                  updatedAt: new Date(comment.updatedAt)
                },
                create: {
                  id: comment.id,
                  userId: item.id,
                  postId: comment.postId,
                  content: comment.content,
                  createdAt: new Date(comment.createdAt || new Date()),
                  updatedAt: new Date(comment.updatedAt),
                  edited: comment.edited || false,
                  parentId: comment.parentId || null
                }
              });
            } else {
              console.log(`Skipping comment ${comment.id} - referenced post ${comment.postId} doesn't exist`);
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.log(`Error creating comment ${comment.id}: ${error.message}`);
            } else {
              console.log(`Error creating comment ${comment.id}: Unknown error occurred`);
            }
          }
        }
      }
    }

    // Create follows
    if (follows.length > 0) {
      console.log(`Creating ${follows.length} follow relationships...`);
      for (const follow of follows) {
        await prisma.follow.upsert({
          where: {
            followerId_followingId: {
              followerId: follow.followerId,
              followingId: follow.followingId
            }
          },
          update: {},
          create: {
            id: follow.id,
            followerId: follow.followerId,
            followingId: follow.followingId,
            createdAt: new Date(follow.createdAt || new Date())
          }
        });
      }
    }

    // Create likes
    if (likes.length > 0) {
      console.log(`Creating ${likes.length} likes...`);
      for (const like of likes) {
        await prisma.like.upsert({
          where: {
            userId_postId: {
              userId: like.userId,
              postId: like.postId
            }
          },
          update: {},
          create: {
            id: like.id,
            userId: like.userId,
            postId: like.postId,
            createdAt: new Date(like.createdAt || new Date())
          }
        });
      }
    }

    // Create comment likes
    if (commentLikes.length > 0) {
      console.log(`Creating ${commentLikes.length} comment likes...`);
      for (const commentLike of commentLikes) {
        await prisma.commentLike.upsert({
          where: {
            userId_commentId: {
              userId: commentLike.userId,
              commentId: commentLike.commentId
            }
          },
          update: {},
          create: {
            id: commentLike.id,
            userId: commentLike.userId,
            commentId: commentLike.commentId,
            createdAt: new Date(commentLike.createdAt || new Date())
          }
        });
      }
    }

    // Create bookmarks
    if (bookmarks.length > 0) {
      console.log(`Creating ${bookmarks.length} bookmarks...`);
      for (const bookmark of bookmarks) {
        await prisma.bookmark.upsert({
          where: {
            userId_postId: {
              userId: bookmark.userId,
              postId: bookmark.postId
            }
          },
          update: {},
          create: {
            id: bookmark.id,
            userId: bookmark.userId,
            postId: bookmark.postId,
            createdAt: new Date(bookmark.createdAt || new Date())
          }
        });
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });