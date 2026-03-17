import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Lock, 
  Database, 
  Users, 
  Building2,
  FileText,
  Activity,
  Settings as SettingsIcon,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SettingsViewProps {
  onShowToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

type SettingsSection = 
  | 'profile' 
  | 'notifications' 
  | 'security' 
  | 'privacy' 
  | 'data' 
  | 'users' 
  | 'departments'
  | 'audit'
  | 'system';

export function SettingsView({ onShowToast }: SettingsViewProps) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  const isSuperAdmin = user?.role === 'super_admin';

  const sections = [
    { id: 'profile' as SettingsSection, label: 'Profile', icon: User, roles: ['all'] },
    { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell, roles: ['all'] },
    { id: 'security' as SettingsSection, label: 'Security', icon: Shield, roles: ['all'] },
    { id: 'privacy' as SettingsSection, label: 'Privacy', icon: Lock, roles: ['all'] },
    { id: 'data' as SettingsSection, label: 'Data & Storage', icon: Database, roles: ['all'] },
    { id: 'users' as SettingsSection, label: 'User Management', icon: Users, roles: ['super_admin', 'admin'] },
    { id: 'departments' as SettingsSection, label: 'Departments', icon: Building2, roles: ['super_admin', 'admin'] },
    { id: 'audit' as SettingsSection, label: 'Audit Logs', icon: Activity, roles: ['super_admin', 'admin'] },
    { id: 'system' as SettingsSection, label: 'System Settings', icon: SettingsIcon, roles: ['super_admin'] },
  ];

  const visibleSections = sections.filter(section => 
    section.roles.includes('all') || section.roles.includes(user?.role || '')
  );

  const handleSectionClick = (sectionId: SettingsSection) => {
    setActiveSection(sectionId);
    setIsMobileSidebarOpen(false);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings user={user} onShowToast={onShowToast} />;
      case 'notifications':
        return <NotificationSettings onShowToast={onShowToast} />;
      case 'security':
        return <SecuritySettings onShowToast={onShowToast} />;
      case 'privacy':
        return <PrivacySettings onShowToast={onShowToast} />;
      case 'data':
        return <DataSettings onShowToast={onShowToast} />;
      case 'users':
        return <UserManagementSettings onShowToast={onShowToast} />;
      case 'departments':
        return <DepartmentSettings onShowToast={onShowToast} />;
      case 'audit':
        return <AuditSettings onShowToast={onShowToast} />;
      case 'system':
        return <SystemSettings onShowToast={onShowToast} />;
      default:
        return <ProfileSettings user={user} onShowToast={onShowToast} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden p-4 border-b border-white/5">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="w-full flex items-center justify-between p-3 bg-navy-900 rounded-lg"
        >
          <div className="flex items-center gap-3">
            {visibleSections.find(s => s.id === activeSection)?.icon && (
              <div className="w-8 h-8 bg-orange-primary/10 rounded-lg flex items-center justify-center">
                {(() => {
                  const Icon = visibleSections.find(s => s.id === activeSection)!.icon;
                  return <Icon className="w-4 h-4 text-orange-primary" />;
                })()}
              </div>
            )}
            <span className="font-medium">
              {visibleSections.find(s => s.id === activeSection)?.label}
            </span>
          </div>
          <ChevronRight className={`w-5 h-5 transition-transform ${isMobileSidebarOpen ? 'rotate-90' : ''}`} />
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileSidebarOpen && (
          <div className="mt-2 bg-navy-900 rounded-lg border border-white/5 overflow-hidden">
            {visibleSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full flex items-center gap-3 p-3 transition-colors ${
                    activeSection === section.id
                      ? 'bg-orange-primary/10 text-orange-primary'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r border-white/5 p-6 space-y-2">
        <h2 className="text-xl font-bold mb-6">Settings</h2>
        {visibleSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-orange-primary/10 text-orange-primary'
                  : 'hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        {renderSectionContent()}
      </div>
    </div>
  );
}

// Profile Settings Component
function ProfileSettings({ user, onShowToast }: any) {
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState<string | null>(
    localStorage.getItem('profilePicture') || null
  );

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setProfilePicture(result);
        localStorage.setItem('profilePicture', result);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('profilePictureChanged'));
        onShowToast('success', 'Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onShowToast('success', 'Profile updated successfully');
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2">Profile Settings</h3>
        <p className="text-sm text-gray-400">Manage your personal information and preferences</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          {/* Profile Picture Upload */}
          <div>
            <label className="text-sm font-medium text-gray-400 mb-3 block">Profile Picture</label>
            <div className="flex items-center gap-4">
              <img
                src={profilePicture || 'https://picsum.photos/seed/doc/100/100'}
                className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                <label
                  htmlFor="profile-picture"
                  className="btn-secondary cursor-pointer inline-flex"
                >
                  Change Picture
                </label>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input-field"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Role</label>
            <div className="px-4 py-2 bg-navy-900/50 border border-white/5 rounded-lg text-sm">
              <span className="capitalize">{user?.role?.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Notification Settings Component
function NotificationSettings({ onShowToast }: any) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [patientUpdates, setPatientUpdates] = useState(true);
  const [accessAlerts, setAccessAlerts] = useState(true);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2">Notification Settings</h3>
        <p className="text-sm text-gray-400">Control how you receive notifications</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive notifications via email</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                emailNotifications ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  emailNotifications ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-400">Receive push notifications in browser</p>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                pushNotifications ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  pushNotifications ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Patient Updates</p>
              <p className="text-sm text-gray-400">Notify when patient records are updated</p>
            </div>
            <button
              onClick={() => setPatientUpdates(!patientUpdates)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                patientUpdates ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  patientUpdates ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Access Alerts</p>
              <p className="text-sm text-gray-400">Alert on unauthorized access attempts</p>
            </div>
            <button
              onClick={() => setAccessAlerts(!accessAlerts)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                accessAlerts ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  accessAlerts ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button onClick={() => onShowToast('success', 'Notification settings saved')} className="btn-primary">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

// Security Settings Component
function SecuritySettings({ onShowToast }: any) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2">Security Settings</h3>
        <p className="text-sm text-gray-400">Manage your account security and authentication</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Current Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">Confirm New Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button onClick={() => onShowToast('success', 'Password updated successfully')} className="btn-primary">
            Update Password
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              twoFactorEnabled ? 'bg-orange-primary' : 'bg-white/10'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                twoFactorEnabled ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// Privacy Settings Component
function PrivacySettings({ onShowToast }: any) {
  const [shareData, setShareData] = useState(false);
  const [activityTracking, setActivityTracking] = useState(true);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2">Privacy Settings</h3>
        <p className="text-sm text-gray-400">Control your data and privacy preferences</p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Share Usage Data</p>
              <p className="text-sm text-gray-400">Help improve the platform by sharing anonymous usage data</p>
            </div>
            <button
              onClick={() => setShareData(!shareData)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                shareData ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  shareData ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Activity Tracking</p>
              <p className="text-sm text-gray-400">Track your activity for audit and compliance</p>
            </div>
            <button
              onClick={() => setActivityTracking(!activityTracking)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                activityTracking ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  activityTracking ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button onClick={() => onShowToast('success', 'Privacy settings saved')} className="btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// Data Settings Component
function DataSettings({ onShowToast }: any) {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2">Data & Storage</h3>
        <p className="text-sm text-gray-400">Manage your data and storage preferences</p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Export Your Data</p>
            <p className="text-sm text-gray-400">Download a copy of your data</p>
          </div>
          <button onClick={() => onShowToast('info', 'Data export started')} className="btn-secondary">
            Export
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="font-medium">Clear Cache</p>
            <p className="text-sm text-gray-400">Clear locally stored cache data</p>
          </div>
          <button onClick={() => onShowToast('success', 'Cache cleared')} className="btn-secondary">
            Clear
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="font-medium text-red-500">Delete Account</p>
            <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
          </div>
          <button onClick={() => onShowToast('error', 'Account deletion requires confirmation')} className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// User Management Settings (Admin only)
function UserManagementSettings({ onShowToast }: any) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="glass-card p-6">
          <p className="text-gray-400 text-center py-8">User management interface coming soon</p>
        </div>
      </div>
    </div>
  );
}

// Department Settings (Admin only)
function DepartmentSettings({ onShowToast }: any) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="glass-card p-6">
          <p className="text-gray-400 text-center py-8">Department settings interface coming soon</p>
        </div>
      </div>
    </div>
  );
}

// Audit Settings (Admin only)
function AuditSettings({ onShowToast }: any) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="glass-card p-6">
          <p className="text-gray-400 text-center py-8">Audit logs interface coming soon</p>
        </div>
      </div>
    </div>
  );
}

// System Settings (Super Admin only)
function SystemSettings({ onShowToast }: any) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="glass-card p-6">
          <p className="text-gray-400 text-center py-8">System settings interface coming soon</p>
        </div>
      </div>
    </div>
  );
}
