const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <section>
        <h3 className="text-lg font-semibold mb-2">Account</h3>
        <div className="space-y-2">
          <input type="text" placeholder="Name" className="border p-2 rounded w-full" />
          <input type="email" placeholder="Email" className="border p-2 rounded w-full" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Preferences</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Email Notifications
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Dark Mode
        </label>
      </section>
    </div>
  );
};

export default Settings;
