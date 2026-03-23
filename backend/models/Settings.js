import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  name: { type: String, default: 'Dahira Manager Pro' },
  slogan: { type: String, default: 'Foi, Fraternité & Solidarité' },
  email: { type: String, default: 'contact@dahira.com' },
  phone: { type: String, default: '+221 33 800 00 00' },
  address: { type: String, default: 'Dakar, Sénégal' },
  logo: { type: String, default: '' },
  banner: { type: String, default: '' },
  twoFactor: { type: Boolean, default: true },
  strictPassword: { type: Boolean, default: true },
  accessLogs: { type: Boolean, default: false },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
