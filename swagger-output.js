const host =
  process.env.NODE_ENV == "development"
    ? "localhost:3000"
    : process.env.PROD_ENV == "staging"
    ? "ancient-everglades-98776.herokuapp.com"
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
  tags: ["authentication", "user", "product", "bid", "notification"],

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
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTY1NTkxODI1NX0.34sbx39M_ds7zgZlfu4kFe9ZBSXM5GO-C8A2SmomnME",
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
                  example: null,
                },
                message: {
                  example: "Register user success",
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
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            type: "string",
          },
          {
            name: "profilePicture",
            in: "formData",
            type: "file",
            required: true,
          },
          {
            name: "name",
            in: "formData",
            type: "string",
            required: true,
          },
          {
            name: "city",
            in: "formData",
            type: "string",
            required: true,
          },
          {
            name: "address",
            in: "formData",
            type: "string",
            required: true,
          },
          {
            name: "phone",
            in: "formData",
            type: "string",
            required: true,
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
                    "city is required",
                    "address is required",
                    "phone is required",
                  ],
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
            name: "Authorization",
            in: "header",
            type: "string",
            description: "provide token to exclude user's product",
          },
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
            name: "sort",
            in: "query",
            type: "string",
            description:
              "sort product by certain key like 'latest', 'oldest', 'cheapest', 'expensive'",
          },
          {
            name: "sellerId",
            in: "query",
            type: "string",
            description: "get all product withou the seller or user product",
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
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            type: "string",
          },
          {
            name: "name",
            in: "formData",
            type: "string",
            required: true,
          },
          {
            name: "price",
            in: "formData",
            type: "string",
            required: true,
          },
          {
            name: "categories[]",
            in: "formData",
            type: "array",
            items: {
              type: "string",
            },
            required: true,
          },
          {
            name: "description",
            in: "formData",
            type: "string",
            required: true,
          },
          {
            name: "images",
            in: "formData",
            type: "array",
            items: {
              type: "file",
            },
            required: true,
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
                    slug: {
                      example: "sea-stone",
                    },
                    price: {
                      example: "420000",
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
    "/products/{productSlug}": {
      get: {
        tags: ["product"],
        summary: "get product by slug",
        parameters: [
          {
            name: "productSlug",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "Authorization",
            in: "header",
            type: "string",
            description:
              "provide token to check if the user have pending bid on this product",
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
                    slug: {
                      example: "sea-stone",
                    },
                    price: {
                      example: "420000",
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
                    bidded: false,
                  },
                },
                message: {
                  example: null,
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
                  example: "Product not found",
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
    "/products/{productId}": {
      put: {
        tags: ["product"],
        summary: "update product by id",
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
            name: "name",
            in: "formData",
            type: "string",
          },
          {
            name: "price",
            in: "formData",
            type: "string",
          },
          {
            name: "categories[]",
            in: "formData",
            type: "array",
            items: {
              type: "string",
            },
          },
          {
            name: "status",
            in: "formData",
            type: "string",
            description: "published or sold",
          },
          {
            name: "description",
            in: "formData",
            type: "string",
          },
          {
            name: "images",
            in: "formData",
            type: "array",
            items: {
              type: "file",
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
                    slug: {
                      example: "sea-stone",
                    },
                    price: {
                      example: "420000",
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
                  example: ["Nothing to update"],
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
    "/products/seller": {
      get: {
        tags: ["product"],
        summary: "get all seller's products",
        parameters: [
          {
            name: "type",
            in: "query",
            type: "string",
            description: "filter product 'bidded' or 'sold'",
          },
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
                  type: "array",
                  items: {
                    oneOf: [
                      { $ref: "#/definitions/Product" },
                      {
                        type: "object",
                        properties: {
                          id: {
                            example: 2,
                          },
                          name: {
                            example: "Sea Stone",
                          },
                          slug: {
                            example: "sea-stone",
                          },
                          price: {
                            example: "420000",
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
                          images: {
                            example: [
                              "cloudinary.contoh-url-gambar-1.com",
                              "cloudinary.contoh-url-gambar-2.com",
                              "cloudinary.contoh-url-gambar-3.com",
                            ],
                          },
                          bids: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  example: 1,
                                },
                                buyer: {
                                  $ref: "#/definitions/User",
                                },
                                bidPrice: {
                                  example: "420000",
                                },
                                status: {
                                  example: "pending",
                                },
                              },
                            },
                          },
                        },
                      },
                    ],
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
    "/bids/user/{buyerId}": {
      get: {
        tags: ["bid"],
        summary: "get all buyer bids by buyerId",
        parameters: [
          {
            name: "buyerId",
            in: "path",
            required: true,
            type: "string",
          },
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
                  type: "object",
                  properties: {
                    buyer: {
                      $ref: "#/definitions/User",
                    },
                    bids: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            example: 1,
                          },
                          bidPrice: {
                            example: "420000",
                          },
                          status: {
                            example: "pending",
                          },
                          product: {
                            type: "object",
                            properties: {
                              id: {
                                example: 1,
                              },
                              name: {
                                example: "Sea Stone",
                              },
                              slug: {
                                example: "sea-stone",
                              },
                              price: {
                                example: "420000",
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
                      },
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
                  example: "Buyer id is user id",
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
                  example: "Invalid buyer id",
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
    "/bids/product/{productId}": {
      post: {
        tags: ["bid"],
        summary: "bid a product by product's id",
        parameters: [
          {
            name: "productId",
            in: "path",
            type: "string",
            required: true,
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
                bidPrice: {
                  example: "420000",
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
                  example: null,
                },
                message: {
                  example: "Success bidding product",
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
                  example: ["Bidprice is required"],
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
                  example: "Bidder is product's seller",
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
                  example: "User already bidding this product",
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
                  example: "Product not found",
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
    "/bids/{bidId}": {
      put: {
        tags: ["bid"],
        summary: "update bid status 'accepted' or 'declined'",
        parameters: [
          {
            name: "bidId",
            in: "path",
            type: "string",
            required: true,
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
                status: {
                  example: "accepted",
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
                  example: null,
                },
                message: {
                  example: "Success update bid",
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
                  example: ["status is required"],
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
                  example: "Can't update this bid status",
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
                  example: "Bid not found",
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
    "/notifications/all": {
      get: {
        tags: ["notification"],
        summary: "get all notification. For mobile",
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
                  type: "array",
                  items: {
                    oneOf: [
                      {
                        type: "object",
                        properties: {
                          id: {
                            example: "1",
                          },
                          isRead: {
                            example: false,
                          },
                          status: {
                            example: "bidIn",
                          },
                          product: {
                            $ref: "#/definitions/Product",
                          },
                          bid: {
                            type: "object",
                            properties: {
                              id: {
                                example: "1",
                              },
                              bidPrice: {
                                example: "450000",
                              },
                              status: {
                                example: "pending",
                              },
                              seller: {
                                $ref: "#/definitions/User",
                              },
                              buyer: {
                                $ref: "#/definitions/User",
                              },
                            },
                          },
                        },
                      },
                      {
                        type: "object",
                        properties: {
                          id: {
                            example: "1",
                          },
                          isRead: {
                            example: false,
                          },
                          status: {
                            example: "published",
                          },
                          product: {
                            $ref: "#/definitions/Product",
                          },
                          bid: {
                            example: null,
                          },
                        },
                      },
                    ],
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
        security: [
          {
            Authorization: [],
          },
        ],
      },
    },
    "/notifications/": {
      get: {
        tags: ["notification"],
        summary: "get all notification where not read yet. For desktop",
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
                  type: "array",
                  items: {
                    oneOf: [
                      {
                        type: "object",
                        properties: {
                          id: {
                            example: "1",
                          },
                          isRead: {
                            example: false,
                          },
                          status: {
                            example: "bidIn",
                          },
                          product: {
                            $ref: "#/definitions/Product",
                          },
                          bid: {
                            type: "object",
                            properties: {
                              id: {
                                example: "1",
                              },
                              bidPrice: {
                                example: "450000",
                              },
                              status: {
                                example: "pending",
                              },
                              seller: {
                                $ref: "#/definitions/User",
                              },
                              buyer: {
                                $ref: "#/definitions/User",
                              },
                            },
                          },
                        },
                      },
                      {
                        type: "object",
                        properties: {
                          id: {
                            example: "1",
                          },
                          isRead: {
                            example: false,
                          },
                          status: {
                            example: "published",
                          },
                          product: {
                            $ref: "#/definitions/Product",
                          },
                          bid: {
                            example: null,
                          },
                        },
                      },
                    ],
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
        security: [
          {
            Authorization: [],
          },
        ],
      },
      put: {
        tags: ["notification"],
        summary: "update bid status 'accepted' or 'declined'",
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
                id: {
                  example: [1, 2],
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
                  example: null,
                },
                message: {
                  example: "success update notifications",
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
                  example: ["Required id in body"],
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
                  example:
                    "Invalid id. Cant update other user's notifications ",
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
    "/wishlists/": {
      get: {
        tags: ["wishlist"],
        summary: "get all user's whistlist",
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
                  type: "object",
                  properties: {
                    id: {
                      example: 1,
                    },
                    name: {
                      example: "Sea Stone",
                    },
                    slug: {
                      example: "sea-stone",
                    },
                    price: {
                      example: "420000",
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
                      $ref: "#/definitions/User",
                    },
                    images: {
                      example: [
                        "cloudinary.contoh-url-gambar-1.com",
                        "cloudinary.contoh-url-gambar-2.com",
                        "cloudinary.contoh-url-gambar-3.com",
                      ],
                    },
                    // Wishlists:  "userId": 1,
                    // "productId": 1,
                  },
                },
                message: {
                  example: null,
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
        },
        security: [
          {
            Authorization: [],
          },
        ],
      },
    },
    "/wishlists/product/{productId}": {
      post: {
        tags: ["wishlist"],
        summary: "add a product to user's wishlists",
        parameters: [
          {
            name: "Authorization",
            in: "header",
            type: "string",
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
                  example: null,
                },
                message: {
                  example: "Product added to wishlist",
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
            description: "For product request",
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
                  example: "Cant add wishlist of your own product",
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
                  example: "Product not found",
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
      delete: {
        tags: ["wishlist"],
        summary: "delete a product from user's whistlist",
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
                  example: null,
                },
                message: {
                  example: "Wishlist destroyed",
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
            description: "Forbbiden",
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
                  example: "Product not found",
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
        profilePicture: {
          example: "cloudinary.contoh-url-profil.com",
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
      },
    },
    Bid: {
      type: "object",
      properties: {
        id: {
          example: 1,
        },
        buyer: {
          $ref: "#/definitions/User",
        },
        product: {
          $ref: "#/definitions/Product",
        },
        bidPrice: {
          example: "420000",
        },
        status: {
          example: "pending",
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
        slug: {
          example: "sea-stone",
        },
        price: {
          example: "420000",
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
      },
    },
  },
};

module.exports = swagger;
