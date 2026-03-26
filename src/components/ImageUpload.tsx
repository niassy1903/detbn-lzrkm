import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (base64: string) => void;
  currentImage?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImage, label = "Image" }) => {
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onImageSelect(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    onImageSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">{label}</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden ${
          preview ? 'border-emerald-500/50 bg-slate-900' : 'border-slate-800 bg-slate-950 hover:border-emerald-500/30'
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-bold">Changer l'image</p>
            </div>
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-3 text-slate-500">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-400 font-medium">Cliquez ou glissez une image</p>
            <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">PNG, JPG jusqu'à 5MB</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
