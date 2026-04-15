# OpenReports Web Client

![logo](./src/assets/main-logo.svg)

## Requirements

- Node >= 20.x

## Features

This application's features are here ( including not implemented )

* [ ] Common
  * [ ] Login
    * [x] Login with ID
    * [x] Login with Google
    * [ ] Login with GitHub
  * [ ] Sign up
    * [ ] Sign up with ID
    * [ ] Sign up with Google
    * [ ] Sign up with GitHub
  * [x] Logout
* [ ] Top
* [ ] Reporting
  * [x] Reports
    * [x] list
    * [x] create
    * [x] update
    * [x] delete
  * [x] Template
    * [x] list
    * [x] create
    * [x] update
    * [x] delete
  * [ ] Groups
    * [ ] list
    * [ ] create
    * [ ] update
    * [ ] delete
  * [ ] Parameter
    * [ ] list
    * [ ] create
    * [ ] update
    * [ ] delete
  * [ ] Scheduling
    * [ ] list
    * [ ] create
    * [ ] update
    * [ ] delete
* [ ] Setting
  * [ ] Workspace
    * [ ] update
    * [ ] members
      * [ ] list
      * [ ] add
      * [ ] update
      * [ ] delete
  * [ ] DataSource
    * [ ] list
    * [ ] create
    * [ ] update
    * [ ] delete
  * [ ] Logs
    * [ ] list

## Technical Stack

 | Name        | Version | Usage          |
 |-------------|---------|----------------|
 | Node        | >= 20.x | Javascript     |
 | Typescript  | 5.9.3   | Language       |
 | React       | 19.2.0  | All of them    |
 | Chakra UI   | 3.30.0  | UI             |
 | React Table | 8.21.3  | Headless table |

## Package structure

This project follows Clean Architecture principles with the following structure:

```
.
├── public/              # Static files
│   └── assets/          # Public assets
├── src/
│   ├── application/     # Application layer
│   │   ├── dto/         # Data Transfer Objects
│   │   │   └── vos/     # Value Objects
│   │   ├── ports/       # Port interfaces
│   │   └── usecases/    # Use cases (business logic)
│   ├── assets/          # Application assets (images, etc.)
│   ├── components/      # Shared UI components
│   │   └── ui/          # UI component library
│   ├── di/              # Dependency injection container
│   ├── domain/          # Domain layer
│   │   └── repositories/ # Repository interfaces
│   ├── infrastructure/  # Infrastructure layer
│   │   ├── config/      # Configuration files
│   │   ├── http/        # HTTP client implementation
│   │   ├── repositories/ # Repository implementations
│   │   ├── state/       # State management
│   │   └── utils/       # Utility functions
│   └── presentation/    # Presentation layer
│       ├── components/  # Presentation components
│       └── pages/       # Page components
├── .eslintrc.json
├── .prettierrc.json
├── package.json
├── README.md
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## How to run

```bash
yarn start
```

