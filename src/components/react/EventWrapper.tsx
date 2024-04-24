import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@components/ui/button.tsx";
import React from "react";

interface EventWrapperProps {
  children: React.ReactNode;
  title: string;
}
export default function EventWrapper({ children, title }: EventWrapperProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInitiated, setIsInitiated] = React.useState(false);
  React.useEffect(() => {
    if (!isInitiated) {
      setIsOpen(true);
      setIsInitiated(true);
    }
  });

  React.useEffect(() => {
    if (!isOpen && isInitiated) {
      setIsOpen(false);
      setTimeout(() => window.history.back(), 300);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="rtl:text-right">
            {children}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
