import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface ModalGlobalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalGlobal: React.FC<ModalGlobalProps> = ({
  open,
  onClose,
  children,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
