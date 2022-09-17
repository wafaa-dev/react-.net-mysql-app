using aspnet_react.Data;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;

var builder = WebApplication.CreateBuilder(args);


//enable CORS
builder.Services.AddCors();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "ASP.NET react app", Version = "V1" });
}
    );

var app = builder.Build();

//to enable cors
app.UseCors(options => options.WithOrigins("http://localhost:3000")
.AllowAnyMethod()
.AllowAnyHeader());

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(
    swaggerUIOption =>
    {
        swaggerUIOption.DocumentTitle = "ASP.NET react App";
        swaggerUIOption.SwaggerEndpoint("/swagger/v1/swagger.json", "a simple web Api app");
        swaggerUIOption.RoutePrefix = String.Empty;
    });

app.UseHttpsRedirection();
//get all posts
app.MapGet("/get-all-posts", async ()=> await PostsRepository.GetPostsAsync())
    .WithTags("Posts Endpoints");
//get post by id
app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    Post postToReturn = await PostsRepository.GetPostByIdAsync(postId);
    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");
//create post
app.MapPost("/create-post", async ( Post postToCreate) =>
{
    bool createSuccessful = await PostsRepository.CreatePostAsync(postToCreate);

    if (createSuccessful)
    {
        return Results.Ok("created successfully");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");


//update post

app.MapPut("/update-post", async (Post postToUpdate) =>
{
    bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("updated successfully");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

//delete post
app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    bool deleteSuccessful = await PostsRepository.DeletePostAsync(postId);

    if (deleteSuccessful)
    {
        return Results.Ok("deleted successfully");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.Run();


