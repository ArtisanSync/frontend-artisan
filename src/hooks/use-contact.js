import { useMutation } from "@tanstack/react-query";
import ContactService from "@/services/contact.service";

export function useContact() {
  const mutation = useMutation({
    mutationFn: (contactData) => ContactService.submitContact(contactData),
  });

  return mutation;
}
