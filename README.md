## How did you organise the modules and your signal store

TasksModule : Feature modules encapsulating UI components, logic, and store related to a specific domain. Contains reusable modules and utilities and routing.

store: Signal store that manages the state of the application.

AppModule: Root module that assembles the feature modules and bootstraps the application.


## certain patterns you used
- Effects: Used to perform side effects like fetching data from the server or updating the store.
- Signals: Used to manage state and trigger updates to the UI.
- Routing: Used to navigate between different pages and components.
- Forms: Used to manage form inputs and validation.
