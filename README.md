# LinkUp

LinkUp is a real-time chat application built with React and Material-UI.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/LinkUp.git
   cd LinkUp
   ```

2. Install dependencies:

   ```
   npm install
   npm install @mui/material @emotion/react @emotion/styled
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add necessary environment variables (if any).

4. Start the development server:
   ```
   npm run dev
   ```

The application should now be running on `http://localhost:5173/`.

## Contributing

We welcome contributions to LinkUp! Here are some guidelines to help you get started:

1. Fork the repository and create your branch from `main`.
2. Ensure you have installed the project dependencies and set up your development environment as described in the Installation section.
3. Make your changes, ensuring you follow our coding conventions:
   - Use Prettier for code formatting. You can run Prettier with:
     ```
     npx prettier --write .
     ```
   - Follow the existing code style and structure.
4. Write clear, concise commit messages.
5. If you've added code that should be tested, add tests.
6. Ensure all tests pass.
7. Make sure your code lints without errors.
8. Create a pull request with a clear title and description.

### Branch Naming Convention

When creating a new branch for your feature or bug fix, please use the following naming convention:

- For features: `feature/your-feature-name`
- For bug fixes: `bugfix/issue-you-are-fixing`
- For documentation: `docs/what-you-are-documenting`

For example:

- `feature/user-authentication`
- `bugfix/message-display-error`
- `docs/api-documentation`

This helps us keep the repository organized and makes it easier to understand the purpose of each branch at a glance.

We appreciate your contributions to making LinkUp better!

## License

This project is licensed under the [MIT License](LICENSE).
