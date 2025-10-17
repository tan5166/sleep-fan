# Workflow

Here are the stages of workflow:

## Stage 1: Analyze the Problem

**Declaration format**: `[Analyze Problem]`

**Must-do tasks**:

- Deeply understand the essence of the requirement
- Search all relevant code
- Identify the root cause of the problem
- Detect any architectural issues
- Ask me for any necessary clarification if something is unclear
- Provide 1–3 solutions (solutions that conflict with the user's intended goal should not be proposed)
- Evaluate pros and cons of each solution

**Embedded principles**:

- **Systems thinking**: When seeing a specific issue, consider the entire system
- **First principles**: Derive solutions from the core purpose, not just existing code
- **DRY principle**: Point out any repeated logic or code
- **Long-term thinking**: Evaluate technical debt and maintenance cost

**Absolutely forbidden**:

- ❌ Modifying any code
- ❌ Rushing into a solution
- ❌ Skipping investigation or understanding
- ❌ Recommending a fix without proper analysis

---

## Stage 2: Refine the Solution

**Declaration format**: `[Refine Solution]`

**Prerequisite**:

- The user explicitly chooses a solution (e.g., "Use solution 1", or "Implement this one")

**Must-do tasks**:

- List all files to be changed (added, modified, deleted), with a brief description of what each file will do

---

## Stage 3: Implement the Solution

**Declaration format**: `[Implement Solution]`

**Must-do tasks**:

- Implement strictly according to the selected solution
- Run type checks and eslint after making changes

**Absolutely forbidden**:

- ❌ Committing code (unless the user explicitly asks)
- ❌ Starting a development server

---

## Stage 4: Code Review

**Declaration Format**: `[Code Review]`

**Must-do Tasks**:

- Review the code to ensure no unnecessary or unused functionality has been implemented; remove any redundant parts.
- Remove any leftover `console.log`, `debugger`, or temporary debugging statements.
- Check that variable, function, and component names are clear and reflect their purpose.
- Ensure comments and documentation are up to date and accurately reflect the current logic.
- You should write tests to validate the implemented functionality in previous stage, and ensure edge cases are covered.
- Run tests related to code writen in previous stage to confirm nothing is broken.
- Run type checks and eslint after making changes.

**Absolutely Forbidden**:

- ❌ Adding new features
- ❌ Removing essential or required code
- ❌ Deleting code that was not written in the previous stage

---

## 🚨 Stage Transition Rules

1. **Default Stage**: Always start with `[Analyze Problem]` when receiving a new issue
2. **Transition Condition**: Only switch stages when the user explicitly approves
3. **Prohibited Behavior**: Do not mix multiple stages in one response

---

## ⚠️ Mandatory Pre-Reply Checklist

```
□ Did I declare the current stage at the beginning?
□ Am I acting strictly within the rules of this stage?
□ If I’m switching stages, did the user give clear consent?
```

**Reminder**:

- Every reply **must declare its current stage**. No exceptions allowed.
- Write your code with a focus on maintainability and readability, and try to keep it modular.