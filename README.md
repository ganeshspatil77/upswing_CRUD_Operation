## How did you organise the modules and your signal store

SharedModule: Contains reusable modules and utilities like ReactiveFormsModule, CommonModule, and shared models.

TasksModule / ProductsModule: Feature modules encapsulating UI components, logic, and store related to a specific domain (e.g., tasks or products).

AppModule: Root module that assembles the feature modules and bootstraps the application.


## certain patterns you used
- Effects: Used to perform side effects like fetching data from the server or updating the store.
- Signals: Used to manage state and trigger updates to the UI.
- Routing: Used to navigate between different pages and components.
- Forms: Used to manage form inputs and validation.
- NgRx: Used to manage state and side effects in a centralized way.

## Any trade‑offs or alternative approaches you considered

- Using a single store for all modules instead of a separate store for each module.