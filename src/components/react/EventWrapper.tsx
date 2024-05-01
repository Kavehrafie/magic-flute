import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@components/ui/button.tsx";
import React from "react";
import { Label } from "@components/ui/label.tsx";
import { Input } from "@components/ui/input.tsx";
import { DEFAULT_LOCALE, type Languages, useTranslations } from "@lib/i18n.ts";
import { SendIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";

interface EventWrapperProps {
  children: React.ReactNode;
  title: string;
  locale: Languages;
  links: {
    [key: string]: string;
  };
}

const formSchema = z.object({
  email: z.string().min(2).email(),
});

export default function EventWrapper({
  children,
  title,
  locale = DEFAULT_LOCALE,
  links,
}: EventWrapperProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInitiated, setIsInitiated] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();
  React.useEffect(() => {
    if (!isInitiated) {
      setIsOpen(true);
      setIsInitiated(true);
    }
  });

  React.useEffect(() => {
    if (!isOpen && isInitiated) {
      setTimeout(() => window.history.back(), 300);
    }
  }, [isOpen]);

  // 2. Define a submit handler.
  async function handleSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("local", locale);
    formData.append("links", JSON.stringify(links));
    // const response = await fetch('/api/event-invitation', {
    //   method: 'POST',
    //   body: formData
    // })
    const response = await fetch("/.netlify/functions/invitationEmail", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        local: locale,
        links: links,
      }),
    });

    if (response.ok) {
      toast({ description: useTranslations(locale)("event.invitation.sent") });
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {useTranslations(locale)("form.event-subscription.email")}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="email@dot.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    {useTranslations(locale)(
                      "form.event-subscription.description"
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end">
              <Button type="submit" className="px-3">
                {useTranslations(locale)("form.event-subscription.action")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
