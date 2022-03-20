CREATE TABLE "todo"(
"id" SERIAL PRIMARY KEY,
"task" VARCHAR (250) NOT NULL,
"status" BOOLEAN);

INSERT INTO "todo"
("task", "status");
