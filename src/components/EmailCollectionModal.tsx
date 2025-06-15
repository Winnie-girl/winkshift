
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BlueprintsList } from "@/components/BlueprintsList";

const emailSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  rememberMe: z.boolean().default(false),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailCollectionModal = ({ isOpen, onClose }: EmailCollectionModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      name: "",
      email: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("email_subscribers")
        .insert({
          name: data.name,
          email: data.email,
          remember_me: data.rememberMe,
          source: "blueprints",
        });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed!",
            description: "This email is already in our system. Check your inbox for access details.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "You now have access to our blueprint library. Check your email for details.",
        });
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    form.reset();
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <DialogTitle className="text-xl font-bold text-white mb-2">
                Welcome to the Blueprint Library!
              </DialogTitle>
              <p className="text-gray-300 text-sm">
                Your access has been confirmed. Download any of these automation blueprints below.
              </p>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <BlueprintsList />
          </div>
          
          <div className="flex-shrink-0 pt-4 border-t border-slate-600/50">
            <Button onClick={handleClose} className="w-full bg-blue-600 hover:bg-blue-500">
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center mb-2">
            Unlock This Blueprint
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <p className="text-gray-300">
            Get instant access to Library of AI automation blueprints.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                      className="border-slate-600 data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-300 text-sm">
                      Remember me (stay logged in)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Access...
                </>
              ) : (
                "Get Access Now"
              )}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-gray-400 text-center mt-4">
          By submitting your email, you agree to receive our newsletter with AI automation tips and blueprint updates. You can unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
};
