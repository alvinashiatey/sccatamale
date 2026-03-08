# AGENTS.md - Developer Guide for sccatamale

## Project Overview

- **Language**: TypeScript
- **Framework**: SvelteKit 2.x with Svelte 5
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Adapter**: @sveltejs/adapter-auto
- **Add-ons**: Prettier, ESLint, Svelte MCP

---

## Commands

### Development

```bash
pnpm dev          # Start development server (default port 5173)
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Type Checking

```bash
pnpm check              # Run svelte-check (types + Svelte)
pnpm check:watch        # Watch mode for type checking
```

### Linting & Formatting

```bash
pnpm lint         # Run Prettier + ESLint (checks only)
pnpm format       # Format all files with Prettier
```

### Running a Single Test

> **Note**: No test framework is currently configured. To add tests, consider installing Vitest or Playwright.

---

## Code Style Guidelines

### Formatting (Prettier)

- **Indentation**: Tabs (useTabs: true)
- **Quotes**: Single quotes only
- **Trailing Commas**: None
- **Print Width**: 100 characters
- **Svelte Files**: Use `prettier-plugin-svelte`

Run `pnpm format` before committing. Check with `pnpm lint`.

### ESLint Configuration

- Uses TypeScript ESLint for type-aware linting
- Svelte plugin with recommended rules
- Prettier integration for formatting (disables conflicting rules)

### TypeScript Conventions

- Enable strict type checking via `pnpm check`
- Use explicit types for function parameters and return types when not inferrable
- Prefer interfaces over types for object shapes
- Use `$lib` alias for imports from `src/lib/`

### Svelte 5 Specific

- This project uses Svelte 5 with runes (`$state`, `$derived`, `$effect`)
- Use the Svelte MCP tools for documentation and code validation
- Component props should use `$props()` rune
- State should use `$state()` rune

---

## Naming Conventions

| Element             | Convention       | Example               |
| ------------------- | ---------------- | --------------------- |
| Files               | kebab-case       | `my-component.svelte` |
| Components          | PascalCase       | `Header.svelte`       |
| Variables/Functions | camelCase        | `getUserData`         |
| Constants           | UPPER_SNAKE_CASE | `MAX_RETRIES`         |
| CSS Classes         | kebab-case       | `.main-content`       |

---

## Import Guidelines

### Aliases

- `$lib` - Points to `src/lib/`
- `$app` - SvelteKit app modules (stores, navigation, etc.)

### Example Imports

```typescript
import { myFunction } from '$lib/utils';
import type { User } from '$lib/types';
import { page } from '$app/stores';
```

### Import Order (recommended)

1. SvelteKit imports (`$app/*`, `$lib/*`)
2. External libraries
3. Relative imports (local files)
4. Type imports (separate if using regular imports)

---

## Error Handling

- Use try/catch for async operations
- Always handle Promise rejections
- Display user-friendly error messages in UI
- Log errors appropriately for debugging
- Use TypeScript's strict null checking

---

## File Organization

```
src/
├── lib/                 # Shared code (components, utils, types)
│   ├── components/      # Reusable Svelte components
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Barrel exports
├── routes/              # SvelteKit routes (file-based routing)
│   ├── +page.svelte     # Route page component
│   ├── +layout.svelte   # Layout component
│   └── [slug]/          # Dynamic route
└── app.html             # HTML template
```

---

## Svelte MCP Tools

This project has access to Svelte MCP tools. Use them for:

1. **list-sections** - Discover Svelte/SvelteKit documentation
2. **get-documentation** - Retrieve full docs for specific topics
3. **svelte-autofixer** - Analyze and fix Svelte code issues
4. **playground-link** - Generate Svelte Playground links

Always use `svelte-autofixer` when writing or editing Svelte components.

---

## Pre-Commit Checklist

Before committing code, ensure:

- [ ] `pnpm check` passes (no type errors)
- [ ] `pnpm lint` passes (formatting + linting)
- [ ] New components pass `svelte-autofixer`
- [ ] No hardcoded secrets or credentials
- [ ] Console is free of unwanted logs

---

## Useful Patterns

### Component Props (Svelte 5)

```svelte
<script lang="ts">
	let {
		title,
		count = 0,
		onClick
	}: { title: string; count?: number; onClick?: () => void } = $props();
</script>
```

### Reactive State (Svelte 5)

```typescript
let count = $state(0);
let doubled = $derived(count * 2);

$effect(() => {
	console.log('Count changed:', count);
});
```

### Fetch with Error Handling

```typescript
async function fetchData() {
	try {
		const response = await fetch('/api/data');
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error('Fetch failed:', error);
		return null;
	}
}
```
