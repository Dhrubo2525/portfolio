# Dhrubo — Personal Portfolio

A responsive static portfolio built with plain HTML, CSS, and JavaScript. No build step or JavaScript framework is required.

## Files

- `index.html` — content and page structure
- `style.css` — visual styling, responsive layouts, dark/light themes
- `script.js` — mobile navigation, theme switch, role text rotation, project filters, reveal effects, and contact form behavior

## Preview locally

1. Keep all three files in the same folder.
2. Double-click `index.html` to open it in a browser, or use VS Code's Live Server extension.
3. The Google Fonts link needs an internet connection; system fallbacks are included.

## Personalize before publishing

1. Open `index.html` and update the name, university details, bio, tools, and project descriptions as needed.
2. In `script.js`, replace `YOUR_EMAIL_HERE` with your real email address. The contact form uses `mailto:`; it does not send or store messages by itself. A server-backed form would require a separate backend/form service.
3. If you have a GitHub profile, add your real profile link where you want it to appear. No social profile has been invented in this starter.
4. Adjust the decorative skill meters in `index.html`; they are illustrative, not formal ratings.
5. Add your own profile photo or resume only if you want one; the current design intentionally uses a code illustration rather than a placeholder portrait.

## Publish on GitHub Pages

1. Create a **public** GitHub repository and upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
2. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/(root)` and save.
3. Once the Pages site is published, add your custom domain (`dhrubo.bond`) in the Pages settings and configure DNS records at your domain provider according to GitHub's current official instructions.
4. Do not delete email-related DNS records such as MX or mail TXT records when changing web hosting records.

## Important

This is a static portfolio. It does not include a server, database, account system, or backend. The contact form opens a pre-filled email only after `CONTACT_EMAIL` is configured.
