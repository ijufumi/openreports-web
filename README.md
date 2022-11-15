# OpenReports Web Client

## Technical Stack

 | Name        | Version | Usage          |
 |---------|----------------|----------------|
 | Typescript  | 4.9.3  | Language       |
 | React       | 18      | All of them    |
 | Chakra UI   | 2.4.1   | UI             |
 | React Table | 8.5.28  | Headless table |

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

