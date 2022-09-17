﻿using System;
using Microsoft.EntityFrameworkCore;

namespace aspnet_react.Data
{
	internal static class PostsRepository
	{
	internal async static Task<List<Post>> GetPostsAsync()
        {
			using (var db =new AppDBContext())
            {
				return await db.Posts.ToListAsync();
            }
        }


        internal async static Task<Post> GetPostByIdAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);

            }
        }
        //create operation 
        internal async static Task<bool> CreatePostAsync( Post postToCreate)
        {
            using (var db = new AppDBContext())

            {
                try
                {
                    await db.Posts.AddAsync(postToCreate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        //update operation
        internal async static Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            using (var db = new AppDBContext())

            {
                try
                {
                    db.Posts.Update(postToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        //delete operation
        internal async static Task<bool> DeletePostAsync(int  postId)
        {
            using (var db = new AppDBContext())

            {
                try
                {
                   Post postToDelete = await GetPostByIdAsync(postId);
                    db.Remove(postToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

    }
}

