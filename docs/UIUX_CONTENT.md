# HirwaPortfolio — UI/UX design specification

## Page 1 — Identity and concept
**My name is Hirwa Honorine.**

- App name: HirwaPortfolio
- Registration number: 25/28159
- Verification code: MOB-A2-8159
- Institution/programme: INES-Ruhengeri, Computer Science / Software Engineering
- Intended audience: recruiter or reviewer considering a student for an internship or first professional opportunity.
- Headline: Aspiring Software Developer | Web Development & AI Enthusiast
- Biography: I am a Computer Science student at INES-Ruhengeri who enjoys turning ideas into simple websites. I have worked on Agri Market and Mwiza Kids Wear, and I am continuing to improve my web development skills. I also use AI tools to support my work, then review and edit the results.
- Visual direction: deep navy (#10243A), teal-blue (#167D8D), soft cool background (#F4F7FA), white cards, muted slate text, and pale teal highlights, white cards and readable dark text.

## Page 2 — User flow and information architecture
- Bottom tabs: Home, Skills, Projects, Editor, About.
- Nested stack: Projects → Project Details → Android Back returns to Projects.
- Saved state: open app → load AsyncStorage → edit → validate → save → close/reopen → restore.
- Media: request camera/gallery permission → capture/select or cancel → preview → replace/remove → save → verify after restart.
- Offline: core screens and local profile should remain usable in Airplane Mode.

## Page 3 — Annotated wireframes: Home and Skills
- Home wireframe: avatar/photo, exact identity sentence, headline, biography, verification code, introduction/focus cards and bottom tabs.
- Skills wireframe: reusable cards for HTML, CSS, JavaScript, MySQL and Basic Website Prototyping, plus a concise education summary for INES-Ruhengeri.
- Annotation: descriptions reflect skills used in projects and areas being practised; they do not claim expert-level experience.

## Page 4 — Annotated wireframes: Projects, Project Details and Editor
- Agri Market: my idea and initial prototype; AI-assisted development with review and edits; HTML, CSS, JavaScript and connected MySQL. Confirm live features before claiming them as working.
- Mwiza Kids Wear: my children’s clothing shop idea and prototype; HTML, CSS and JavaScript; MySQL planned but not connected.
- Project detail includes the problem/idea, my contribution, technologies and status.
- Editor: headline, biography, primary skill, availability, take photo, choose gallery, preview, replace/remove, save and reset.
- Validation: headline ≥5 non-space characters; biography ≥20; skill ≥2. Invalid saves are blocked with field-level errors.

## Page 5 — Visual and accessibility decisions
- Deep navy identity surfaces, teal-blue primary actions, pale teal highlights, readable contrast and consistent spacing. The Home screen uses a compact profile hero, project/skill snapshot cards, and an availability indicator. Projects use status pills, technology tags, and clear exploration links.
- Scalable text, visible field labels, accessibility labels, button roles and textual validation messages.
- Scrollable screens and comfortable touch targets should be checked on a narrow phone and with Android large text.
- Profile data is local; do not store passwords, tokens or sensitive personal records.
- Compare the wireframes with actual installed-APK screenshots before submission. Do not claim device tests until they have been performed.
