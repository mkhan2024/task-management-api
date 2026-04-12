### PreMilestone: Project Planning and Proposal

Student Name: Md Apurba Khan
Project Name: Task Management API


## 1. Project Concept
Purpose and Theme:
I am building a very simple API for a personal task manager that will help people keep their daily work organized. The main abilities will be to create Projects, create Tasks in those Projects and add Comments to those Tasks. It's like a mini version of Todoist or Trello but much more stripped down and for one person only so you won't be seeing other people's stuff or other people seeing your stuff. I chose this because it should be applicable in everyday life, and it feels like easy to follow through and more practical.

Why I chose this project:
1. It is pretty straightforward and uses the same kind of examples I have seen in the modules notes.
2. It needs three main resources Which is: Projects, Tasks, and Comments. which is what the assignment rubrics wants.
3. I can explain everything we've done in Modules 1 to 5 without making the logic too complicated.


## 2. Scope and Functionality
Three Main Resources besides the Users resource for authentication:
1. Projects
2. Tasks
3. Comments

Planned Endpoints:
Projects:
1. GET /projects - Get all my projects
2. POST /projects - Create a new project
3. GET /projects/:id - Get one specific project
4. PUT /projects/:id - Update a project
5. DELETE /projects/:id - Delete a project

Tasks:
1. GET /projects/:projectId/tasks - Get all tasks in a project
2. POST /projects/:projectId/tasks - Create a new task in a project
3. GET /tasks/:id - Get one task
4. PUT /tasks/:id - Update a task
5. DELETE /tasks/:id - Delete a task

Comments:
1. GET /tasks/:taskId/comments - Get all comments on a task
2. POST /tasks/:taskId/comments - Create a new comment on a task
3. DELETE /comments/:id - Delete a comment

Data Needs:
All data will be stored in the Firebase Firestore. Each task will have a projectId that refers to the project it's in. Each comment will have a taskId that refers to the task it's in. Each document will also have a userId so that users can only access their documents.


## 3. Course Content Alignment

This project fits really well with what I have been studying in the course:
1. Module 1: Back end basics, Express server setup, TypeScript, project structure, the health checks, testing strategy and the GitHub Actions
2. Module 2: Routes, controllers, services, and all the CRUD operations
3. Module 3: Firestore repositories, the data models and the Joi validation
4. Module 4: Firebase Authentication and the role based authorization using custom claims
5. Module 5: Swagger/OpenAPI docs, Helmet.js and CORS

New Component (something extra outside the course):
I also want to add basic rate limiting with express-rate-limit, which was one of the proposed additional features. I'll research and write this up in new-component-plan.md during Milestone 1, and will only implement it after getting approval from the instructor.

## 4. GitHub Project Setup

1. Repository: https://github.com/mkhan2024/task-management-api.git
2. Add a project board in GitHub with the columns To Do, In Progress, Review, and Done.
3. Create issues for the main tasks in each milestone
4. I will be doing all development using the same Git workflow as the course notes with main, development and feature branches.


### Update After Professor's Feedback
## Finalized Data Models
After feedback of the professor, I have updated the data models to keep project, task and comment structure clearer. I also made sure each item stores the information of like who created it and when it was updated.

## Projects Collection

interface Project {
  id: string;
  name: string;
  description?: string;
  status: "active" | "completed";
  createdBy: string; // Firebase user uid
  createdAt: Date;
  updatedAt: Date;
}

## Tasks Collection

interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: "todo" | "in-progress" | "done";
  createdBy: string; // Firebase user uid
  createdAt: Date;
  updatedAt: Date;
}

## Comments Collection

interface Comment {
  id: string;
  taskId: string;
  text: string;
  createdBy: string; // Firebase user uid
  createdAt: Date;
}