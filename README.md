# dobots

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Technologies Used

*   Next.js
*   React
*   Firebase (Authentication, Firestore, etc.)
*   ... other libraries and frameworks

## Setup

### Local Development

1.  Clone the repository:
2.  Install dependencies:
3.  Set up environment variables (if needed).
4.  Run the development server:

The app should be running at `http://localhost:3000`.

### Firebase Project Setup

1.  Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  Enable Firebase App Hosting for your project.
3.  Connect your Firebase project to this GitHub repository.

## Building and Deployment

The project is built for production using `npm run build` (configured in `package.json`). The build output is in the `.next` directory.

Deployment is handled automatically by [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) when changes are pushed to the connected Git branch. The deployment configuration is defined in `apphosting.yaml`.

## Important Files

*   `package.json`: Project dependencies and scripts.
*   `apphosting.yaml`: Firebase App Hosting configuration.
*   `.idx/dev.nix`: Firebase Studio development environment setup.
*   `next.config.ts`: Next.js configuration.



