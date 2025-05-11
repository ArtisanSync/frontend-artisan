"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
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
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
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
  const phoneNumber = "6282256627675";

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
    <section id="contact" className="w-full py-16 md:py-24 md:px-6">
      <div className="container mx-auto max-w-7xl sm:px-4 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-start">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">Let's Talk</h2>
              <p className="text-gray-400">
                Reach out for business inquiries or just say hello.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">Address:</h3>
                  <p className="text-gray-400">
                    Kalimantan Timur, Samarinda, Samarinda Kota
                    <br />
                    Jln Wahidhasyim 75119
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">Phone:</h3>
                  <a
                    href={`tel:+${phoneNumber}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    +62 821-5418-2046
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">Email:</h3>
                  <a
                    href="mailto:syncartisan@gmail.com"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    syncartisan@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">WhatsApp:</h3>
                  <a
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    +62 821-5418-2046
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-white">
                    Working Hours:
                  </h3>
                  <p className="text-gray-400">
                    Monday to Friday, 09.00–17.00 WIB
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">
                  Connect with us:
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/artisan_sync/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/artisansync/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Send Us a Message
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="min-h-[90px] relative">
                      <FormLabel className="text-gray-200">Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your name"
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
                      <FormLabel className="text-gray-200">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Enter your email"
                            type="email"
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="min-h-[90px] relative">
                      <FormLabel className="text-gray-200">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your subject"
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
                      <FormLabel className="text-gray-200">Message</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea
                            placeholder="Type your message here..."
                            className="pl-10 bg-black/30 border-white/10 text-white min-h-[120px] resize-none"
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
          </div>
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
