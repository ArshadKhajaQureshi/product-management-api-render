# Plan: Check for hidden files and configs

1. Read `.gitignore` to identify ignored files (like `.env`) that might influence the API.
2. Read `package.json` to analyze dependencies and scripts.
3. Explore the `.claude` directory to see if there are any project-specific instructions or configs.
4. Report findings to the user.
