# Pizzeria Deliziosa - Frontend UI

Version 0.5.0

This Angular application serves as the frontend for the Pizzeria Deliziosa restaurant, providing customers with an interactive menu and ordering system. The project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Features

- **Interactive Menu**: Browse all available pizzas with filter options for vegetarian, spicy, and popular items
- **Shopping Cart**: Add pizzas to your cart, adjust quantities, and see a running total
- **Checkout Process**: Multi-step form for collecting customer information and delivery details
- **Order Confirmation**: Receive confirmation with order details after placing an order
- **Backend API Integration**: Connects to a Java Spring Boot backend for retrieving pizza data and processing orders

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## API Integration

This frontend application connects to a Java Spring Boot backend API at `http://localhost:8080/api`. The integration includes:

- `/api/pizze` - Get all available pizzas
- `/api/pizze/{id}` - Get details for a specific pizza
- `/api/cart` - Create and manage shopping cart
- `/api/orders` - Submit and track customer orders

## Project Structure

- `src/app/components` - UI components for each page and reusable elements
- `src/app/models` - TypeScript interfaces for data models
- `src/app/services` - Services for API communication and business logic
- `src/app/data` - Mock data for testing when backend is unavailable

## Changelog

### Version 0.5.0 (May 28, 2025)
- Added backend API integration for pizza menu, cart, and order processing
- Implemented checkout process with multi-step form
- Added order confirmation page
- Integrated with Spring Boot backend
- Added fallback to local data when backend is unavailable
