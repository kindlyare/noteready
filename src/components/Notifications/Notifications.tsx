import toast from "react-hot-toast";

export const notifyNoteSaved = () => toast.success('Nota Salva com sucesso!');
export const notifyNoteFinish = () => toast.success('Parabéns, você terminou sua nota');
export const notifyNoteCorrent = () => toast('👏 Você está fazendo a nota ');
export const notifyNoteRemoved = () => toast('🗑️  Nota removida ');
