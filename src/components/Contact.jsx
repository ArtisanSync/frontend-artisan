"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContact } from "@/hooks/use-contact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Send,
  MessageSquare,
  User,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const contactMutation = useContact();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await contactMutation.mutateAsync(data);
      form.reset();
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowErrorAlert(true);
    }
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-16">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm rounded-full border-primary/30 text-white"
          >
            Get in Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full my-2"></div>
          <p className="max-w-[600px] text-base text-gray-400 md:text-lg">
            Have a project in mind? We'd love to hear from you! Send us a
            message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-white/10 bg-black/60 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Send us a message
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  autoComplete="off"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="min-h-[90px] relative">
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Your name"
                                className="pl-10 bg-black/30 border-white/10 text-white"
                                autoComplete="off"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <div className="h-5 mt-1">
                            <FormMessage className="text-red-400 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="min-h-[90px] relative">
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Your email"
                                className="pl-10 bg-black/30 border-white/10 text-white"
                                autoComplete="off"
                                type="email"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <div className="h-5 mt-1">
                            <FormMessage className="text-red-400 text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="min-h-[90px] relative">
                        <FormLabel className="text-white">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Subject of your message"
                            className="bg-black/30 border-white/10 text-white"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <div className="h-5 mt-1">
                          <FormMessage className="text-red-400 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="min-h-[180px] relative">
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Textarea
                              placeholder="What would you like to tell us?"
                              className="pl-10 bg-black/30 border-white/10 text-white min-h-[150px]"
                              autoComplete="off"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <div className="h-5 mt-1">
                          <FormMessage className="text-red-400 text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent className="bg-blue-950 border-blue-500/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Message Sent Successfully
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Thank you for reaching out. We've received your message and will
              get back to you shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 text-white">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent className="bg-red-950 border-red-500/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Error Sending Message
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {contactMutation.error?.response?.data?.message ||
                "Something went wrong. Please try again later."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white">
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
