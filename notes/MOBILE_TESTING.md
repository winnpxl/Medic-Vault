# Mobile Testing Guide

## Quick Test Instructions

### Using Chrome DevTools (Easiest Method)

1. **Open the app** in Chrome: `http://localhost:3000`

2. **Open DevTools**:
   - Windows/Linux: `F12` or `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

3. **Toggle Device Toolbar**:
   - Windows/Linux: `Ctrl + Shift + M`
   - Mac: `Cmd + Shift + M`
   - Or click the device icon in DevTools toolbar

4. **Select a device preset**:
   - iPhone 12 Pro (390 x 844)
   - iPhone SE (375 x 667)
   - iPad Air (820 x 1180)
   - Samsung Galaxy S20 (360 x 800)
   - Or use "Responsive" for custom sizes

5. **Test different orientations**:
   - Click the rotation icon to switch portrait/landscape

## What to Test

### Mobile View (< 768px)

#### Bottom Navigation
- [ ] Bottom nav bar is visible
- [ ] All 5 buttons work (Home, Patients, Depts, Folders, Menu)
- [ ] Active tab is highlighted in orange
- [ ] Icons and labels are clear

#### Mobile Header
- [ ] Header is sticky at top
- [ ] Medic Vault logo visible
- [ ] Search button works
- [ ] Notification bell has badge
- [ ] Tapping buttons feels responsive

#### Mobile Menu
- [ ] Menu button opens slide-out drawer
- [ ] Drawer slides in from right smoothly
- [ ] User profile displays correctly
- [ ] Quick actions work
- [ ] Logout button works
- [ ] Clicking backdrop closes menu
- [ ] X button closes menu

#### Dashboard
- [ ] Stats cards display in 2 columns
- [ ] All text is readable
- [ ] Patient cards show instead of table
- [ ] Cards are easy to tap
- [ ] Patient actions dropdown works
- [ ] Pagination works (if > 10 patients)

#### Patients View
- [ ] "Add New Patient" button visible
- [ ] Search bar is full width
- [ ] Filter buttons work
- [ ] Patient cards display properly
- [ ] All patient info visible in cards
- [ ] Scrolling is smooth

#### Authentication
- [ ] Login form is mobile-friendly
- [ ] Inputs are easy to tap
- [ ] Password toggle works
- [ ] Social login buttons are clear
- [ ] Form submits correctly

### Tablet View (768px - 1023px)
- [ ] Bottom nav still visible
- [ ] Content uses more space
- [ ] Stats in 2-4 columns
- [ ] Patient cards or table (depends on width)
- [ ] Everything remains accessible

### Desktop View (≥ 1024px)
- [ ] Sidebar visible on left
- [ ] Desktop header visible
- [ ] Bottom nav hidden
- [ ] Mobile header hidden
- [ ] Table view for patients
- [ ] All desktop features work

## Common Issues to Check

### Layout Issues
- [ ] No horizontal scrolling (except filters)
- [ ] Content doesn't overflow viewport
- [ ] Modals fit on screen
- [ ] Text doesn't get cut off
- [ ] Images scale properly

### Touch Issues
- [ ] All buttons are easy to tap
- [ ] No accidental taps
- [ ] Dropdowns work on touch
- [ ] Swipe gestures don't interfere
- [ ] Forms are easy to fill

### Visual Issues
- [ ] Text is readable without zooming
- [ ] Colors have good contrast
- [ ] Icons are clear
- [ ] Spacing feels comfortable
- [ ] Animations are smooth

### Functional Issues
- [ ] Navigation works
- [ ] Forms submit
- [ ] Modals open/close
- [ ] Data loads
- [ ] Actions complete
- [ ] Errors display properly

## Device-Specific Tests

### iPhone (Safari)
```
Sizes to test:
- iPhone SE: 375 x 667
- iPhone 12/13: 390 x 844
- iPhone 12/13 Pro Max: 428 x 926
```

**Check**:
- [ ] Safe area insets (notch handling)
- [ ] Bottom nav doesn't overlap home indicator
- [ ] Tap targets are adequate
- [ ] Scrolling is smooth
- [ ] Forms work with iOS keyboard

### Android (Chrome)
```
Sizes to test:
- Small phone: 360 x 640
- Medium phone: 360 x 800
- Large phone: 412 x 915
```

**Check**:
- [ ] Navigation bar handling
- [ ] Keyboard doesn't break layout
- [ ] Back button behavior
- [ ] Chrome UI doesn't interfere

### iPad (Safari)
```
Sizes to test:
- iPad Mini: 768 x 1024
- iPad Air: 820 x 1180
- iPad Pro 12.9": 1024 x 1366
```

**Check**:
- [ ] Uses available space well
- [ ] Not just stretched mobile view
- [ ] Touch targets still adequate
- [ ] Landscape mode works

## Quick Test Scenarios

### Scenario 1: New User Login
1. Open app on mobile
2. See auth screen
3. Fill in login form
4. Submit
5. See dashboard with bottom nav
6. Navigate between tabs
7. Open mobile menu
8. Logout

### Scenario 2: View Patient
1. Open app on mobile
2. Go to Patients tab
3. Scroll through patient cards
4. Tap a patient card
5. View patient profile
6. Go back
7. Try patient actions dropdown

### Scenario 3: Filter Patients
1. Open Patients view
2. Tap Status filter
3. Select a status
4. See filtered results
5. Clear filter
6. Try Department filter
7. Use search

### Scenario 4: Responsive Resize
1. Start in desktop view
2. Slowly resize to tablet
3. Continue to mobile
4. Check all breakpoints
5. Verify smooth transitions
6. No broken layouts

## Performance Testing

### Load Time
- [ ] Initial load < 3 seconds
- [ ] Navigation feels instant
- [ ] Images load quickly
- [ ] No janky animations

### Scrolling
- [ ] Smooth 60fps scrolling
- [ ] No lag when scrolling lists
- [ ] Sticky elements stay in place
- [ ] Pull-to-refresh doesn't trigger accidentally

### Interactions
- [ ] Buttons respond immediately
- [ ] No double-tap zoom on buttons
- [ ] Modals animate smoothly
- [ ] Transitions are fluid

## Accessibility Testing

### Touch Targets
- [ ] All buttons ≥ 44x44px
- [ ] Adequate spacing between buttons
- [ ] Easy to tap without mistakes

### Text
- [ ] Readable without zooming
- [ ] Good contrast ratios
- [ ] Font sizes appropriate
- [ ] Line heights comfortable

### Navigation
- [ ] Logical tab order
- [ ] Clear focus indicators
- [ ] Screen reader friendly
- [ ] Keyboard accessible (tablets)

## Browser Compatibility

### Test in Multiple Browsers
- [ ] Chrome (Android, Desktop)
- [ ] Safari (iOS, Mac)
- [ ] Firefox (Android, Desktop)
- [ ] Edge (Desktop)
- [ ] Samsung Internet (Android)

## Reporting Issues

### Issue Template
```
**Device**: iPhone 12 Pro
**Browser**: Safari 15
**Screen Size**: 390 x 844
**Issue**: Bottom nav overlaps content
**Steps to Reproduce**:
1. Open app
2. Navigate to Patients
3. Scroll to bottom
**Expected**: Content visible above nav
**Actual**: Last patient card hidden
**Screenshot**: [attach if possible]
```

## Quick Fixes

### If bottom nav is hidden:
- Check `z-50` class on MobileNav
- Verify `fixed bottom-0` positioning

### If content is cut off:
- Add `pb-16 lg:pb-0` to content container
- Check for `overflow-hidden` on parent

### If buttons are too small:
- Verify `min-h-[44px]` on buttons
- Check padding values

### If text is too small:
- Use responsive text classes
- Check base font size

### If layout breaks:
- Inspect with DevTools
- Check for fixed widths
- Verify responsive classes

## Success Criteria

The mobile implementation is successful if:
- ✅ All features accessible on mobile
- ✅ No horizontal scrolling
- ✅ Touch targets are adequate
- ✅ Text is readable
- ✅ Navigation is intuitive
- ✅ Performance is smooth
- ✅ Works on real devices
- ✅ Feels like a native app

## Next Steps After Testing

1. **Document any issues found**
2. **Prioritize fixes** (critical vs. nice-to-have)
3. **Test fixes on real devices**
4. **Get user feedback**
5. **Iterate and improve**

## Support

If you find issues:
1. Check this guide first
2. Review `MOBILE_RESPONSIVE_GUIDE.md`
3. Inspect with DevTools
4. Test on different devices
5. Document and report

Happy testing! 🚀📱
