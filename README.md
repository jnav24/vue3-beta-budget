# Dime Budget
Dime Budget is a budget management app. Track all of your reoccurring finances that is auto-populated based on the template you create. There are a wide set of categories to better organize your expenses for reporting. 

**Status:** in development

## Screenshots

![screenshot: dashboard page](https://dimebudget.app/images/budget_dashboard_home.png)
![screenshot: budget edit page](https://dimebudget.app/images/budget_dashboard_edit.png)
![screenshot: settings page](https://dimebudget.app/images/budget_dashboard_settings.png)

## Requirements

This is not a monolith app and would require the [Dime Budget API](https://github.com/jnav24/dime-budget-api) in order to work. This project was done using Vue 3, Typescript, TailwindCSS and Pinia. You would need Node version 14 or greater.

## Project setup
Copy the contents of `.env.sample`, paste them into a `.env` file and add your credentials.

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
