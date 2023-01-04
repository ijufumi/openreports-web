# OpenReports Web Client

## Features

This application's features are here ( including not implemented )

* [ ] Common
  * [ ] Login
    * [x] Login with ID
    * [x] Login with Google
    * [ ] Login with GitHub
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
 |---------|----------------|----------------|
 | Typescript  | 4.9.4   | Language       |
 | React       | 18.2.0  | All of them    |
 | Chakra UI   | 2.4.6   | UI             |
 | React Table | 8.7.4   | Headless table |

## Package structure

```
.
├── public             # HTML and favicon
├── src                
│   ├── assets         # Images
│   ├── components     # Components using by several pages
│   ├── config         # Configuration files
│   ├── pages          # Page component
│   ├── repositories   # Connecting to external systems
│   ├── states         # Manage state
│   ├── use_cases      # Use case pattern for pages
│   └── vos            # Value Object
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

