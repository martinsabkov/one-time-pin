# OTP (One-time pin) Input App

This application features two components:

## Parent Component: AppVerifyPage.vue

- Renders an interface for entering a one-time PIN (OTP).
- Handles the completion event when all input boxes are filled.
- Handles the mask event and passes it down to the child component.

## Child Component: OneTimePin.vue

- Renders individual input boxes for OTP entry.
- Validates user input based on the chosen validation type: numbers, letters, or a combination of both.
- Allows navigation between input boxes - left (←) and right (→) arrow.
- Provides PIN masking for added security by hiding the entered digits.
- Allows pasting from clipboard to enter the pin.
- Allows a default value prop to pre-enter the pin.

## Project setup

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
