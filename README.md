My name is Hirwa Honorine.

# HirwaPortfolio

## Student information
- Full name: Hirwa Honorine
- Registration number: 25/28159
- Verification code: MOB-A2-8159
- Institution: INES-Ruhengeri
- Programme: Computer Science / Software Engineering
- App version: 1.0.0

## Purpose
HirwaPortfolio is an offline-first personal portfolio app for presenting a student introduction, skills, education, projects and an editable profile.

## Features
- Home introduction with the required identity sentence.
- Skills and education timeline.
- Project cards with technology tags and a nested stack-based Project Details screen inside the Projects tab. Android Back returns to the project list.
- Controlled “Edit my portfolio” screen with three validation rules and field-level messages.
- Camera capture and gallery selection, image preview, replace and remove actions.
- Local persistence with AsyncStorage, plus a confirmation-protected reset-to-default action.
- About screen with identity, registration number, verification code, version and data-use statement.
- Core screens do not require internet access.

## Personalization required before submission
- Confirm that every biography and skill statement is accurate. The current headline is 'Aspiring Software Developer | Web Development & AI Enthusiast'.
- Review the Agri Market and Mwiza Kids Wear descriptions and correct any feature that is not accurate.
- Confirm the exact website features that work today; do not describe intended features as completed.
- Add real project URLs/repository links if available.
- Add genuine education dates/training if applicable.
- Add a profile photo only if you want to and have permission to use it.
- Check all identity information.

## Requirements
Install Node.js LTS and npm, then install dependencies.

```bash
npm install
npx expo install --fix
npx expo start
```

Run the app on a connected development device using Expo Go during development if needed. Expo Go is not accepted as the final release demonstration.

The main implementation is in `src/App.tsx`; the root `App.tsx` is the Expo entry point.

## Type checking
```bash
npm run typecheck
```

## Android APK build
Install and log in to EAS CLI:

```bash
npm install --global eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

The `preview` profile is configured to request an APK. Follow the EAS build output and download the resulting APK. Install it on an Android device and test it before submission.

## Tested device and Android version
Not yet tested. Fill in only after physical-device testing:
- Device model:
- Android version:
- Test date:
- APK build URL:

## Release and final commit
- GitHub repository: add your actual repository URL here.
- GitHub release v1.0.0: add the actual release URL after creating it.
- APK URL: add the actual APK download URL.
- Final commit hash: run `git rev-parse HEAD` after the final commit and paste the result.

## Known limitations
- Review each project description against the current website before submission; do not claim intended features are working unless you have tested them.
- Image persistence stores a local URI; verify that the URI remains valid after app restart and on the target Android version. For a robust final build, copy selected images into app-managed persistent storage if testing shows gallery URIs are not durable.
- Camera and gallery permission behavior must be tested on the target phone.
- The revised source has not been compiled, built, or tested on a physical Android device in this environment. Treat all test-log entries as pending until you perform them.


## Android tab-bar touch fix
The bottom tab bar has extra height and bottom padding so the Home, Skills, Projects, Editor, and About buttons sit farther above Android's system navigation controls. If testing on a device with a different navigation-bar layout, adjust `tabBarStyle` in `App.tsx`.
