# Day 5 Notes

## Git Workflow

Today I practiced a more professional Git workflow.

### Main Branch
The `main` branch is the stable branch of the project.

### Feature Branch
A feature branch is used to work on a specific change without directly changing `main`.

Example:

feature/day-5-practice

## Commands Practiced

git status
= shows the current Git state

git branch
= shows branches

git branch feature/day-5-practice
= creates a new branch

git checkout feature/day-5-practice
= switches to that branch

git add
= stages changes

git commit
= saves a checkpoint locally

git checkout main
= returns to main

git merge feature/day-5-practice
= merges the feature branch into main

git push
= sends commits to GitHub

## Workflow I Practiced

main
↓
create feature branch
↓
switch to feature branch
↓
make changes
↓
stage changes
↓
commit
↓
switch back to main
↓
merge feature branch
↓
push to GitHub

## Problem I Hit Today

I tried to create:

step-01/day-05/git-practice.md

before creating the day-05 folder.

PowerShell returned a DirectoryNotFoundException.

I fixed it by creating the folder first and then creating the file.

## Final Result

- Feature branch created
- Change committed
- Feature branch merged into main
- Changes pushed to GitHub
- Working tree clean
- Local main synced with origin/main

## Day 5 HTML Recovery

I completed the missing Day 5 HTML work.

### Contact Form

I added:
- Name
- Email
- Subject
- Message
- Visible labels
- Send Message button

### HTML Validation

I used:
- required
- minlength
- maxlength
- type="email"
- autocomplete

I tested invalid and valid form input in the browser.

### Images and Accessibility

I added a project image with useful alt text.

I made the image responsive using:

max-width: 100%;
height: auto;

I tested the page at mobile widths.

### Metadata

I added:
- Page title
- Viewport metadata
- Meta description
- Open Graph title
- Open Graph description
- Open Graph type

### Keyboard Accessibility

I tested the page using only the keyboard with:
- Tab
- Shift + Tab
- Enter

### Final Validation

The final Day 5 index.html passed HTML validation with no errors or warnings.