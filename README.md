# OpenReports Web Client

![logo](./src/assets/main-logo.svg)

## Requirements

- Node 24.x (Active LTS) or 26.x (Current)

## Tech Stack

| Name                 | Version | Usage                              |
|----------------------|---------|------------------------------------|
| Node                 | 24.x / 26.x | JavaScript runtime             |
| TypeScript           | 5.9.x   | Language                           |
| React                | 19.2.x  | UI library                         |
| React Router         | 7.9.x   | Routing                            |
| Chakra UI            | 3.30.x  | UI component library               |
| MobX / mobx-react    | 6.15.x  | State management                   |
| TanStack React Table | 8.21.x  | Headless table                     |
| Formik               | 2.4.x   | Form handling                      |
| Zod                  | 4.1.x   | Schema validation                  |
| Day.js               | 1.11.x  | Date handling                      |
| styled-components    | 6.1.x   | Styling                            |
| webpack              | 5.x     | Bundler / dev server               |
| ESLint / Prettier    | 9.x / 3.x | Linting / formatting             |
| Husky / lint-staged  | 9.x / 16.x | Git hooks (pre-commit lint)     |

## Directory structure

This project follows Clean Architecture principles (see [CLEAN_ARCHITECTURE.md](./CLEAN_ARCHITECTURE.md)):

```
.
├── public/                    # Static files
│   └── assets/                # Public assets
├── src/
│   ├── application/           # Application layer
│   │   ├── dto/               # Data Transfer Objects
│   │   │   └── vos/           # Value Objects
│   │   │       ├── requests/  # Request VOs
│   │   │       └── responses/ # Response VOs
│   │   ├── ports/             # Use case interfaces (input ports)
│   │   └── usecases/          # Use case implementations (business logic)
│   ├── assets/                # Application assets (images, etc.)
│   ├── components/            # Shared UI components
│   │   └── ui/                # UI component library (input-group, toaster, tooltip)
│   ├── di/                    # Dependency injection (Repository / UseCase factories)
│   ├── domain/                # Domain layer
│   │   └── repositories/      # Repository interfaces
│   ├── infrastructure/        # Infrastructure layer
│   │   ├── config/            # Configuration (constants, Chakra UI theme)
│   │   ├── http/              # HTTP client base (BaseRepository)
│   │   ├── repositories/      # Repository implementations
│   │   ├── state/             # Global state (Breadcrumbs, Credentials, Loader, LoginUser, Toast)
│   │   └── utils/             # Utilities (date, download, string)
│   ├── presentation/          # Presentation layer
│   │   ├── components/        # Shared presentation components (data_table, errors)
│   │   └── pages/             # Page components
│   │       ├── data_sources/  # Data source list / create / edit
│   │       ├── errors/        # Error pages
│   │       ├── google_callback/ # Google OAuth callback
│   │       ├── layout/        # Authorized layout (header, navigation)
│   │       ├── login/         # Login page
│   │       ├── members/       # Member profile
│   │       ├── reports/       # Report list / create / edit
│   │       ├── templates/     # Template list / create / edit
│   │       └── top/           # Top (dashboard) page
│   ├── app.tsx                # App root (routing)
│   └── index.tsx              # Entry point
├── CLEAN_ARCHITECTURE.md
├── eslint.config.mjs
├── package.json
├── README.md
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## Implemented features

This application's features are here (including not implemented).

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
  * [x] Profile update
* [x] Top (dashboard)
* [ ] Reporting
  * [x] Reports
    * [x] list
    * [x] create
    * [x] update
    * [x] delete
    * [x] output (Excel / PDF download)
  * [x] Templates
    * [x] list
    * [x] create (file upload)
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
  * [x] DataSource
    * [x] list
    * [x] create
    * [x] update
    * [x] delete
  * [ ] Logs
    * [ ] list

## How to run

```bash
yarn start
```
