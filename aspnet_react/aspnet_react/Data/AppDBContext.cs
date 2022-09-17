using System;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;


namespace aspnet_react.Data
{
    internal sealed class AppDBContext : DbContext
    {

        public DbSet<Post> Posts { get; set; }

        //public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        //{

        //}


        //public AppDBContext() : base()
        //{
        //}


        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseMySql(@"server=localhost;user=root;database=PostsDB",ServerVersion.AutoDetect(@"server=localhost;user=root;database=PostsDB"));

        //{
        //   if (!optionsBuilder.IsConfigured)
        //    {
        //        IConfigurationRoot configuration = new ConfigurationBuilder()
        //            .Build();
        //        var connectionString = configuration.GetConnectionString("AppConnection");

        //        optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

        //    }

        //}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postsToSeed = new Post[6];
            for (int i = 1; i <= 6; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    PostId = i,
                    Title = $"Post{i}",
                    Content = $"this is post {i} and it has a great content"
                };
            }
            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }



    }
}

