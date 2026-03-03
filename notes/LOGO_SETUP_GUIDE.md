# Logo and Favicon Setup Guide

## Overview
Your Medic Vault app is now configured to use custom logo and favicon images. Just add your PNG files and they'll appear throughout the app!

## Required Files

### 1. Logo File
**Filename**: `logo.png`  
**Location**: `public/logo.png` (root of public folder)  
**Recommended Size**: 512x512px or 1024x1024px  
**Format**: PNG with transparent background  
**Usage**: Used in sidebar, mobile header, mobile menu, and auth screen

### 2. Favicon File (Optional - Same as Logo)
**Filename**: `logo.png`  
**Location**: `public/logo.png` (same file as logo)  
**Recommended Size**: 512x512px (will be auto-scaled)  
**Format**: PNG  
**Usage**: Browser tab icon

## Quick Setup Steps

### Step 1: Prepare Your Logo
1. Create or export your logo as PNG
2. Recommended: Square aspect ratio (1:1)
3. Recommended size: 512x512px or larger
4. Transparent background works best
5. Save as `logo.png`

### Step 2: Add to Project
1. Locate the `public` folder in your project root
2. Copy your `logo.png` file into the `public` folder
3. That's it! The app will automatically use it

### Step 3: Verify
1. Refresh your browser (`Ctrl+R` or `Cmd+R`)
2. Check these locations:
   - Browser tab (favicon)
   - Sidebar (top left)
   - Mobile header (when screen < 1024px)
   - Mobile menu (when opened)
   - Auth screen (left side branding)

## File Structure

```
medic-vault/
├── public/
│   └── logo.png          ← Add your logo here
├── src/
│   └── ...
└── index.html
```

## Where Your Logo Appears

### Desktop View
1. **Sidebar** (top left corner)
   - Size: 40x40px
   - Next to "Medic Vault" text

### Mobile View
2. **Mobile Header** (top of screen)
   - Size: 32x32px
   - Next to "Medic Vault" text

3. **Mobile Menu** (slide-out drawer)
   - Size: 40x40px
   - In the menu header

### Authentication
4. **Auth Screen** (login/register page)
   - Size: 48x48px
   - Left side branding section

### Browser
5. **Favicon** (browser tab)
   - Auto-scaled by browser
   - Appears in tab, bookmarks, history

## Logo Specifications

### Recommended Specs
- **Format**: PNG (supports transparency)
- **Size**: 512x512px or 1024x1024px
- **Aspect Ratio**: 1:1 (square)
- **Background**: Transparent or solid color
- **Color Mode**: RGB
- **Bit Depth**: 24-bit or 32-bit (with alpha)

### Design Tips
- Keep it simple and recognizable
- Ensure it's readable at small sizes
- Use high contrast for visibility
- Test on both light and dark backgrounds
- Avoid fine details that disappear when scaled

## Alternative Sizes (Optional)

If you want different sizes for different uses, you can create multiple files:

### Option 1: Single File (Recommended)
```
public/
└── logo.png (512x512px)
```
The app will scale it automatically.

### Option 2: Multiple Sizes (Advanced)
```
public/
├── logo.png (512x512px - main logo)
├── logo-small.png (64x64px - optional)
└── favicon.ico (optional - for older browsers)
```

Then update the code to use different files in different places.

## Troubleshooting

### Logo not showing?
1. **Check filename**: Must be exactly `logo.png` (lowercase)
2. **Check location**: Must be in `public/` folder, not `src/`
3. **Refresh browser**: Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. **Clear cache**: Browser might be caching old version
5. **Check file**: Open `http://localhost:3000/logo.png` directly to verify it loads

### Logo looks blurry?
- Use a higher resolution image (1024x1024px)
- Ensure PNG is not compressed too much
- Check that image is actually square

### Logo has wrong colors?
- Check color mode is RGB (not CMYK)
- Verify transparency is working
- Test on dark background (app uses dark theme)

### Favicon not updating?
- Clear browser cache
- Close and reopen browser
- Check `http://localhost:3000/logo.png` loads
- Wait a few seconds for browser to update

## Testing Checklist

After adding your logo, verify it appears in:

- [ ] Browser tab (favicon)
- [ ] Desktop sidebar (top left)
- [ ] Mobile header (< 1024px width)
- [ ] Mobile menu (tap Menu button)
- [ ] Auth screen (login/register page)
- [ ] Logo is clear and readable
- [ ] Logo scales properly at all sizes
- [ ] Logo works on dark background

## Example Logo Placement

### Desktop Sidebar
```
┌─────────────────────┐
│ [LOGO] Medic Vault  │  ← Your logo here
│        Medical Cloud│
├─────────────────────┤
│ Navigation...       │
```

### Mobile Header
```
┌─────────────────────────────┐
│ [LOGO] Medic Vault    🔔 🔍 │  ← Your logo here
└─────────────────────────────┘
```

### Auth Screen
```
┌──────────────────────────────┐
│ [LOGO] Medic Vault           │  ← Your logo here
│                              │
│ Description text...          │
└──────────────────────────────┘
```

## Code References

If you need to change logo behavior, here are the files:

- `index.html` - Favicon reference
- `src/components/layout/Sidebar.tsx` - Desktop sidebar logo
- `src/components/layout/MobileHeader.tsx` - Mobile header logo
- `src/components/layout/MobileMenu.tsx` - Mobile menu logo
- `src/components/auth/AuthScreen.tsx` - Auth screen logo

## Advanced Customization

### Change Logo Size
Edit the `className` in the component files:

```tsx
// Current (40x40px)
<img src="/logo.png" className="w-10 h-10 object-contain" />

// Larger (48x48px)
<img src="/logo.png" className="w-12 h-12 object-contain" />

// Smaller (32x32px)
<img src="/logo.png" className="w-8 h-8 object-contain" />
```

### Add Logo Styling
```tsx
<img 
  src="/logo.png" 
  className="w-10 h-10 object-contain rounded-lg"  // Add rounded corners
/>

<img 
  src="/logo.png" 
  className="w-10 h-10 object-contain shadow-lg"  // Add shadow
/>
```

### Use Different Logo for Dark/Light Mode
```tsx
<img 
  src="/logo-dark.png"  // For dark theme
  className="w-10 h-10 object-contain"
/>
```

## Quick Reference

| Location | File | Size | Class |
|----------|------|------|-------|
| Favicon | `public/logo.png` | Auto | - |
| Sidebar | `public/logo.png` | 40x40 | `w-10 h-10` |
| Mobile Header | `public/logo.png` | 32x32 | `w-8 h-8` |
| Mobile Menu | `public/logo.png` | 40x40 | `w-10 h-10` |
| Auth Screen | `public/logo.png` | 48x48 | `w-12 h-12` |

## Support

### Need Help?
1. Check this guide
2. Verify file location and name
3. Try hard refresh (Ctrl+Shift+R)
4. Check browser console for errors
5. Verify image loads at `http://localhost:3000/logo.png`

### Common Issues
- **Wrong location**: Must be in `public/` not `src/`
- **Wrong name**: Must be `logo.png` (lowercase)
- **Cache**: Clear browser cache
- **Format**: Must be PNG format

## Summary

1. ✅ Create your logo as `logo.png` (512x512px recommended)
2. ✅ Place it in the `public/` folder
3. ✅ Refresh your browser
4. ✅ Your logo now appears everywhere!

That's it! Simple and clean. 🎨
