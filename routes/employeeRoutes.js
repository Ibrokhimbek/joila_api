const {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  editEmployee,
} = require("../controllers/employeeController");

const auth = require("../middlewares/auth");

function employeeRoutes(fastify, options, done) {
  //* Register employee
  fastify.post("", {
    preHandler: [auth(["admin", "employer"])],

    schema: {
      tags: ["Employee"],
    },
    handler: registerEmployee,
  });

  //* Login employee
  fastify.post("/login", {
    schema: {
      tags: ["Employee"],
    },
    handler: loginEmployee,
  });

  //* Get all employees
  fastify.get("/", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employee"],
    },
    handler: getAllEmployees,
  });

  //* Get one employee
  fastify.get("/:id", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employee"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Employee id",
          },
        },
      },
      headers: {
        type: "object",
        required: ["authorization"],
        properties: {
          authorization: {
            type: "string",
            description: "Admin or Employer token",
          },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: { type: "string" },
            employee: {
              type: "object",
              properties: {
                _id: { type: "string" },
                fullname: { type: "string" },
                phone_number: { type: "string" },
                employer_id: { type: "string" },
                balance: { type: "number" },
                debt: { type: "number" },
              },
            },
          },
        },
      },
    },
    handler: getEmployee,
  });

  //* delete an employee
  fastify.delete("/:id", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employee"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Employee id",
          },
        },
      },
      headers: {
        type: "object",
        required: ["authorization"],
        properties: {
          authorization: {
            type: "string",
            description: "Admin or Employer token",
          },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: { type: "string" },
            employee: {
              type: "object",
              properties: {
                _id: { type: "string" },
                fullname: { type: "string" },
                phone_number: { type: "string" },
                employer_id: { type: "string" },
                balance: { type: "number" },
                debt: { type: "number" },
              },
            },
          },
        },
      },
    },
    handler: deleteEmployee,
  });

  fastify.put("/:id", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employee"],
      body: {
        type: "object",
        properties: {
          fullname: { type: "string" },
          phone_number: { type: "string" },
        },
      },
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Successful response",
          type: "object",
          properties: {
            message: { type: "string" },
            employee: {
              type: "object",
              properties: {
                _id: { type: "string" },
                fullname: { type: "string" },
                phone_number: { type: "string" },
                employer_id: { type: "string" },
                balance: { type: "number" },
                debt: { type: "number" },
              },
            },
          },
        },
      },
    },
    handler: editEmployee,
  });

  done();
}

module.exports = employeeRoutes;
