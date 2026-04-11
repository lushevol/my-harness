# Coding Style Rules

## General Principles

### 1. Immutability (CRITICAL)

ALWAYS create new objects, NEVER mutate existing ones:

```javascript
// WRONG: Mutates original
function addItem(cart, item) {
  cart.items.push(item);  // Mutates!
  return cart;
}

// CORRECT: Returns new object
function addItem(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item]
  };
}
```

### 2. File Organization

MANY SMALL FILES > FEW LARGE FILES:
- High cohesion, low coupling
- 200-400 lines typical, 800 max
- Extract utilities from large modules
- Organize by feature/domain, not by type

### 3. Function Size

Functions should be small and focused:
- Maximum 50 lines per function
- Do one thing well
- Extract complex logic into helper functions

### 4. Naming Conventions

- Use descriptive names that reveal intent
- Avoid abbreviations (except common ones: id, url, etc.)
- Boolean names should sound like questions: `isValid`, `hasPermission`
- Constants in UPPER_SNAKE_CASE

### 5. Error Handling

- Handle errors explicitly at every level
- Provide user-friendly error messages in UI-facing code
- Log detailed error context on the server side
- Never silently swallow errors

### 6. Input Validation

- Validate all user input before processing
- Use schema-based validation where available
- Fail fast with clear error messages
- Never trust external data (API responses, user input, file content)

## Code Quality Checklist

Before marking work complete:

- [ ] Code is readable and well-named
- [ ] Functions are small (<50 lines)
- [ ] Files are focused (<400 lines typical, 800 max)
- [ ] No deep nesting (>4 levels)
- [ ] Proper error handling
- [ ] No hardcoded values (use constants or config)
- [ ] No mutation (immutable patterns used)
- [ ] Input validated at boundaries
- [ ] Tests cover happy path and edge cases
