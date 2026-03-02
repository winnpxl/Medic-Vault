# Development Guide - Medic Vault

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

## Project Architecture

### Component Structure

```
Component Hierarchy:
App
├── Sidebar (navigation)
├── Header (search, notifications)
└── Content (dynamic based on route)
    ├── DashboardView
    ├── PatientsView
    ├── DepartmentDetailView
    ├── PatientProfile
    ├── FoldersView
    └── DefaultView
```

### Data Flow

1. **API Layer** (`src/api/`): Handles all data fetching
2. **Types** (`src/types/`): TypeScript interfaces for type safety
3. **Components**: Receive data via props, emit events via callbacks
4. **App.tsx**: Central state management and routing logic

## Adding New Features

### Adding a New Page/View

1. Create component in appropriate folder:
```typescript
// src/components/myfeature/MyFeatureView.tsx
import React from 'react';

interface MyFeatureViewProps {
  // Define props
}

export function MyFeatureView({ }: MyFeatureViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <h2 className="text-2xl font-bold">My Feature</h2>
      {/* Your content */}
    </div>
  );
}
```

2. Add route to `App.tsx`:
```typescript
case 'myfeature':
  return <MyFeatureView />;
```

3. Add sidebar item to `src/constants/index.ts`:
```typescript
{ id: 'myfeature', label: 'My Feature', icon: MyIcon, section: 'General' }
```

### Adding a New Modal

1. Create modal content component:
```typescript
// src/components/modals/MyModal.tsx
export function MyModalContent() {
  return (
    <div className="space-y-8">
      {/* Modal content */}
    </div>
  );
}
```

2. Add modal to `App.tsx`:
```typescript
{activeModal === 'mymodal' && (
  <CenterModal title="My Modal" onClose={() => setActiveModal(null)}>
    <MyModalContent />
  </CenterModal>
)}
```

### Adding a New API Endpoint

1. Add endpoint to `server/index.ts`:
```typescript
app.get("/api/myendpoint", (req, res) => {
  res.json({ data: "my data" });
});
```

2. Create API function in `src/api/`:
```typescript
export const fetchMyData = async () => {
  const response = await fetch('/api/myendpoint');
  return response.json();
};
```

3. Use in component:
```typescript
useEffect(() => {
  fetchMyData().then(setMyData);
}, []);
```

## Styling Guidelines

### Using Tailwind Classes

```typescript
// Good: Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-navy-900">

// Avoid: Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### Custom Classes

Defined in `src/index.css`:
- `.glass-card` - Card with glass morphism effect
- `.sidebar-item` - Sidebar navigation item
- `.sidebar-item-active` - Active sidebar item
- `.input-field` - Form input field
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button

### Color Palette

```css
--color-navy-950: #0A0A0A  /* Background */
--color-navy-900: #121212  /* Cards */
--color-navy-800: #1A1A1A  /* Hover states */
--color-orange-primary: #FF6200  /* Primary actions */
--color-orange-secondary: #FF8533  /* Secondary actions */
```

## State Management

### Local State (useState)
Use for component-specific state:
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Lifted State
Pass state down via props, callbacks up:
```typescript
// Parent
const [selected, setSelected] = useState(null);
<Child onSelect={setSelected} />

// Child
<button onClick={() => onSelect(item)}>
```

### Future: Global State
For complex state, consider:
- Redux Toolkit
- Zustand
- Jotai

## TypeScript Best Practices

### Define Interfaces

```typescript
// src/types/index.ts
export interface MyData {
  id: string;
  name: string;
  optional?: string;
}
```

### Use Type-Safe Props

```typescript
interface MyComponentProps {
  data: MyData;
  onAction: (id: string) => void;
}

export function MyComponent({ data, onAction }: MyComponentProps) {
  // TypeScript will catch errors
}
```

### Avoid `any`

```typescript
// Bad
const data: any = fetchData();

// Good
const data: MyData = fetchData();
```

## Testing (Future)

### Unit Tests
```typescript
// MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### Integration Tests
```typescript
// api.test.ts
import { fetchPatients } from './api/patients';

test('fetches patients', async () => {
  const patients = await fetchPatients();
  expect(patients).toHaveLength(50);
});
```

## Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## Debugging

### React DevTools
Install React DevTools browser extension to inspect component tree and props.

### Console Logging
```typescript
console.log('Debug:', { data, state });
```

### TypeScript Errors
```bash
npm run lint
```

### Network Requests
Use browser DevTools Network tab to inspect API calls.

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev:vite -- --port 3001
```

### TypeScript Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling Not Applied
```bash
# Restart dev server
# Tailwind may need restart to pick up new classes
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide Icons](https://lucide.dev)
- [Motion (Framer Motion)](https://motion.dev)

## Getting Help

1. Check this guide first
2. Search existing issues
3. Ask the team
4. Create detailed issue with:
   - What you're trying to do
   - What's happening
   - Error messages
   - Steps to reproduce
