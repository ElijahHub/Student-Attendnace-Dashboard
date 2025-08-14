"use client";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Account Settings */}
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Account Settings</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john@example.com
          </p>
          <button className="px-3 py-1 rounded bg-blue-500 text-white">
            Change Password
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Notifications</h2>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> Email Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Push Notifications
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked /> In-App Notifications
          </label>
        </div>
      </section>
    </div>
  );
}
