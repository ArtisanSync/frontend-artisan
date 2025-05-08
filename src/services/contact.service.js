import api from "@/lib/api";

const ContactService = {
  submitContact: async (contactData) => {
    const response = await api.post("/public/contact", contactData);
    return response.data;
  },
};

export default ContactService;
