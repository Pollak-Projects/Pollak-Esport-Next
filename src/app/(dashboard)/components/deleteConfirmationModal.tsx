"use client";
import { X } from "lucide-react";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  gameName: string;
}

const DeleteConfirmationModal = ({ onClose, onConfirm, gameName }: DeleteConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-xl p-6 w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Játék törlése</h2>
        <p className="text-slate-300 mb-6">
          Biztos törölni akarod a &quot;{gameName}&quot; nevű játékot? Ezt nem lehet visszavonni.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            Mégse
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition-colors"
          >
            Megerősítés
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
