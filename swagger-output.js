const host =
  process.env.NODE_ENV == "development"
    ? "localhost:3000"
    : "backend-secondhand-3.herokuapp.com";
const schema = process.env.NODE_ENV == "development" ? ["http"] : ["https"];

let swagger = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "REST API",
    description: "",
  },
  host: host,
  basePath: "/api",
  tags: ["authentication", "user", "product"],

  schemes: schema,
  paths: {
    "/auth/login": {
      post: {
        tags: ["authentication"],
        summary: "login user",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                email: {
                  example: "user@gmail.com",
                },
                password: {
                  example: "User1234567",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/definitions/User",
                    },
                    token: {
                      example: "$iqwuiqn187@%n.19281928tgajbsd.12jn1i2x8",
                    },
                  },
                },
                message: {
                  example: null,
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Invalid email or password",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["authentication"],
        summary: "register user",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                name: {
                  example: "user",
                },
                email: {
                  example: "user@gmail.com",
                },
                password: {
                  example: "User1234567",
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Created",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      example: 1,
                    },
                    name: {
                      example: "user",
                    },
                    email: {
                      example: "user@gmail.com",
                    },
                    createdAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                    updatedAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                    ciry: {
                      example: null,
                    },
                    address: {
                      example: null,
                    },
                    phone: {
                      example: null,
                    },
                    verified: {
                      example: null,
                    },
                  },
                },
                message: {
                  example: null,
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: [
                    "Email Already Taken",
                    "Password Must Contain a Number",
                  ],
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
      },
    },
    "/users": {
      get: {
        tags: ["user"],
        summary: "get user information by token",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  $ref: "#/definitions/User",
                },
                message: {
                  example: null,
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Unauthorized",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
      put: {
        tags: ["user"],
        summary: "update user data",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            type: "string",
          },
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                name: {
                  example: "user",
                },
                city: {
                  example: "yogyakarta",
                },
                address: {
                  example: "catur tunggal, rt 2 rw 5 sleman yogyakarta",
                },
                phone: {
                  example: "0811221113868",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      example: 1,
                    },
                    name: {
                      example: "user",
                    },
                    email: {
                      example: "user@gmail.com",
                    },
                    city: {
                      example: "yogyakarta",
                    },
                    address: {
                      example: "catur tunggal, rt 2 rw 5 sleman yogyakarta",
                    },
                    phone: {
                      example: "0811221113868",
                    },
                    verified: {
                      example: true,
                    },
                    createdAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                    updatedAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                  },
                },
                message: {
                  example: null,
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Unauthorized",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
    },
    "/products/": {
      get: {
        tags: ["product"],
        summary: "get all products with or without filter",
        parameters: [
          {
            name: "search",
            in: "query",
            type: "string",
            description: "search product name",
          },
          {
            name: "categories",
            in: "query",
            type: "array",
            description: "filter by product categories in array",
          },
          {
            name: "page",
            in: "query",
            type: "string",
            description: "page number",
          },
        ],
        responses: {
          200: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  type: "array",
                  items: {
                    $ref: "#/definitions/Product",
                  },
                },
                message: {
                  example: null,
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["product"],
        summary: "create product",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            type: "string",
          },
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                name: {
                  example: "Sea Stone",
                },
                price: {
                  example: 420000,
                },
                categories: {
                  example: ["hobi", "kesehatan"],
                },
                description: {
                  example:
                    "Seastone is a naturally-occurring—but immensely rare—mineral substance, best known for its negation of Devil Fruit abilities. Though it originates from Wano Country, Seastone is currently utilized in many inventions and devices across the world. As the most advanced research on it was conducted by the Marine scientist Dr. Vegapunk, its use is particularly common among the Marines and World Government",
                },
                images: {
                  example: [
                    "cloudinary.contoh-url-gambar-1.com",
                    "cloudinary.contoh-url-gambar-2.com",
                    "cloudinary.contoh-url-gambar-3.com",
                  ],
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      example: 1,
                    },
                    name: {
                      example: "Sea Stone",
                    },
                    price: {
                      example: 420000,
                    },
                    categories: {
                      example: ["hobi", "kesehatan"],
                    },
                    description: {
                      example:
                        "Seastone is a naturally-occurring—but immensely rare—mineral substance, best known for its negation of Devil Fruit abilities. Though it originates from Wano Country, Seastone is currently utilized in many inventions and devices across the world. As the most advanced research on it was conducted by the Marine scientist Dr. Vegapunk, its use is particularly common among the Marines and World Government",
                    },
                    status: {
                      example: "published",
                    },
                    sellerId: {
                      example: 1,
                    },
                    images: {
                      example: [
                        "cloudinary.contoh-url-gambar-1.com",
                        "cloudinary.contoh-url-gambar-2.com",
                        "cloudinary.contoh-url-gambar-3.com",
                      ],
                    },
                    createdAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                    updatedAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                  },
                },
                message: {
                  example: null,
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: ["Name is required", "Price is required"],
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Unauthorized",
                },
              },
            },
          },
          403: {
            description: "Forbidden request",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "User not verified",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
    },
    "/products/{productId}": {
      get: {
        tags: ["product"],
        summary: "get product by id",
        parameters: [
          {
            name: "productId",
            in: "path",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  $ref: "#/definitions/Product",
                },
                message: {
                  example: null,
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["product"],
        summary: "update product",
        parameters: [
          {
            name: "productId",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "Authorization",
            in: "header",
            type: "string",
          },
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                name: {
                  example: "Sea Stone",
                },
                price: {
                  example: 420000,
                },
                categories: {
                  example: ["hobi", "kesehatan"],
                },
                description: {
                  example:
                    "Seastone is a naturally-occurring—but immensely rare—mineral substance, best known for its negation of Devil Fruit abilities. Though it originates from Wano Country, Seastone is currently utilized in many inventions and devices across the world. As the most advanced research on it was conducted by the Marine scientist Dr. Vegapunk, its use is particularly common among the Marines and World Government",
                },
                images: {
                  example: [
                    "cloudinary.contoh-url-gambar-1.com",
                    "cloudinary.contoh-url-gambar-2.com",
                    "cloudinary.contoh-url-gambar-3.com",
                  ],
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Ok",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "success",
                },
                data: {
                  type: "object",
                  properties: {
                    id: {
                      example: 1,
                    },
                    name: {
                      example: "Sea Stone",
                    },
                    price: {
                      example: 420000,
                    },
                    categories: {
                      example: ["hobi", "kesehatan"],
                    },
                    description: {
                      example:
                        "Seastone is a naturally-occurring—but immensely rare—mineral substance, best known for its negation of Devil Fruit abilities. Though it originates from Wano Country, Seastone is currently utilized in many inventions and devices across the world. As the most advanced research on it was conducted by the Marine scientist Dr. Vegapunk, its use is particularly common among the Marines and World Government",
                    },
                    status: {
                      example: "published",
                    },
                    sellerId: {
                      example: 1,
                    },
                    images: {
                      example: [
                        "cloudinary.contoh-url-gambar-1.com",
                        "cloudinary.contoh-url-gambar-2.com",
                        "cloudinary.contoh-url-gambar-3.com",
                      ],
                    },
                    createdAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                    updatedAt: {
                      example: "2022-04-21T15:09:26.780Z",
                    },
                  },
                },
                message: {
                  example: null,
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Unauthorized",
                },
              },
            },
          },
          403: {
            description: "Forbidden request",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "User not verified",
                },
              },
            },
          },
          403: {
            description: "Forbidden request",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "User is not the product's seller",
                },
              },
            },
          },
          404: {
            description: "Resource not found",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Product doesnt exist",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                status: {
                  example: "error",
                },
                data: {
                  example: null,
                },
                message: {
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
    },
  },
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },

  definitions: {
    User: {
      type: "object",
      properties: {
        id: {
          example: 1,
        },
        name: {
          example: "user",
        },
        email: {
          example: "user@gmail.com",
        },
        city: {
          example: "yogyakarta",
        },
        address: {
          example: "catur tunggal, rt 2 rw 5 sleman yogyakarta",
        },
        phone: {
          example: "0811221113868",
        },
        verified: {
          example: true,
        },
        createdAt: {
          example: "2022-04-21T15:09:26.780Z",
        },
        updatedAt: {
          example: "2022-04-21T15:09:26.780Z",
        },
      },
    },
    Product: {
      type: "object",
      properties: {
        id: {
          example: 1,
        },
        name: {
          example: "Sea Stone",
        },
        price: {
          example: 420000,
        },
        categories: {
          example: ["hobi", "kesehatan"],
        },
        description: {
          example:
            "Seastone is a naturally-occurring—but immensely rare—mineral substance, best known for its negation of Devil Fruit abilities. Though it originates from Wano Country, Seastone is currently utilized in many inventions and devices across the world. As the most advanced research on it was conducted by the Marine scientist Dr. Vegapunk, its use is particularly common among the Marines and World Government",
        },
        status: {
          example: "published",
        },
        seller: {
          $ref: "#/definitions/User",
        },
        images: {
          example: [
            "cloudinary.contoh-url-gambar-1.com",
            "cloudinary.contoh-url-gambar-2.com",
            "cloudinary.contoh-url-gambar-3.com",
          ],
        },
        createdAt: {
          example: "2022-04-21T15:09:26.780Z",
        },
        updatedAt: {
          example: "2022-04-21T15:09:26.780Z",
        },
      },
    },
  },
};

module.exports = swagger;