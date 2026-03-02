# Feature Guide - Folder Detail View

## Accessing Department Folders

### Navigation Path
```
Dashboard → Departments → [Select Department] → Files Tab → [Click Folder]
```

### Step-by-Step

1. **Go to Departments**
   - Click "Departments" in the sidebar
   - You'll see all departments (Cardiology, Oncology, Pediatrics, Laboratory)

2. **Select a Department**
   - Click on any department card
   - You'll see department overview with tabs

3. **Navigate to Files**
   - Click the "Files" tab
   - You'll see 4 folders:
     - Patient Records (45 items, 1.2 GB)
     - Lab Reports (128 items, 850 MB)
     - Imaging Data (32 items, 4.5 GB)
     - Consultation Notes (210 items, 120 MB)

4. **Open a Folder**
   - Click on any folder card
   - You'll enter the Folder Detail View

## Folder Detail View Features

### View Modes

**List View** (Default)
- Table format with columns:
  - File Name (with icon)
  - Type (PDF, DOCX, DICOM, etc.)
  - Size
  - Category
  - Uploaded By
  - Upload Date
  - Actions

**Grid View**
- Card-based layout
- Visual file preview
- Key metadata displayed
- Quick actions at bottom

### Search & Filter

**Search Bar**
- Located at top left
- Search by file name
- Real-time filtering

**Filter Button**
- Filter by file type
- Filter by category
- Filter by date range
- Filter by uploader

**View Toggle**
- Switch between List and Grid
- Located at top right
- Preference persists during session

### File Actions

Each file has quick actions:

1. **Download** (Download icon)
   - Download file to local machine

2. **Share** (Share icon)
   - Share file with external parties
   - Set access permissions

3. **Delete** (Trash icon)
   - Remove file (with confirmation)
   - Red color for danger action

4. **More Options** (Three dots)
   - Additional file operations
   - View details
   - Edit metadata
   - View history

### File Information

Each file displays:
- **Name**: Full filename with extension
- **Type**: File format badge (color-coded)
- **Size**: File size in KB/MB
- **Category**: Medical category (Lab Results, Imaging, etc.)
- **Uploaded By**: Staff member who uploaded
- **Upload Date**: When file was added

### Sample Files Included

The view includes 8 sample files:
1. patient_record_PT000001.pdf (2.4 MB)
2. lab_results_PT000002.pdf (1.8 MB)
3. xray_scan_PT000003.dcm (15.2 MB)
4. prescription_PT000004.pdf (856 KB)
5. consultation_notes_PT000005.docx (124 KB)
6. blood_test_PT000006.pdf (1.2 MB)
7. discharge_summary_PT000007.pdf (3.1 MB)
8. ecg_report_PT000008.pdf (2.7 MB)

## Light Mode Support

All features work perfectly in both themes:

### Dark Mode (Default)
- Dark backgrounds
- Light text
- Orange accents
- Subtle borders

### Light Mode
- White backgrounds
- Dark text
- Orange accents
- Clear borders
- High contrast

**To Switch**: Click user menu → "Switch to Light Mode"

## Keyboard Shortcuts (Future)

Planned keyboard shortcuts:
- `Ctrl/Cmd + F`: Focus search
- `Ctrl/Cmd + G`: Toggle grid/list view
- `Arrow Keys`: Navigate files
- `Enter`: Open selected file
- `Delete`: Delete selected file
- `Escape`: Go back

## Responsive Design

The folder view adapts to screen size:

**Desktop** (1920px+)
- 4 columns in grid view
- Full table in list view
- All actions visible

**Tablet** (768px - 1919px)
- 3 columns in grid view
- Scrollable table in list view
- Actions in dropdown

**Mobile** (< 768px)
- 1-2 columns in grid view
- Card-based list view
- Swipe actions

## Tips & Tricks

1. **Quick Search**: Start typing immediately after opening folder
2. **Bulk Actions**: Select multiple files (future feature)
3. **Sort**: Click column headers to sort
4. **Preview**: Hover over file for quick preview (future)
5. **Drag & Drop**: Drag files to upload (future)

## Integration Points

This feature integrates with:
- Department management
- Patient records
- File upload system
- Access control system
- Audit logging
- External sharing

## Future Enhancements

Planned improvements:
1. File preview modal
2. Bulk operations
3. Advanced filtering
4. File versioning
5. Comments and annotations
6. Real-time collaboration
7. File encryption status
8. Compliance indicators
9. Auto-categorization
10. Smart search with AI

## API Endpoints (Future)

When connected to backend:
```
GET /api/departments/:deptId/folders/:folderId/files
POST /api/departments/:deptId/folders/:folderId/files
DELETE /api/files/:fileId
GET /api/files/:fileId/download
POST /api/files/:fileId/share
```

## Security Considerations

- Role-based access control
- Audit trail for all actions
- Encryption at rest and in transit
- Secure file sharing with expiry
- Access logs and monitoring
- Compliance with HIPAA/GDPR

---

**Current Status**: ✅ Fully functional with mock data
**Server**: Running on http://localhost:3000
**Ready for**: Testing and feedback
