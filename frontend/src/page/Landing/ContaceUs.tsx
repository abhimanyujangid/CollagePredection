import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IContactUsForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  role: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<IContactUsForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    role: "Student",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Reach out to our support team.
          </p>
        </div>

        <div className="flex justify-evenly flex-col md:flex-row gap-8">
          <Card className="p-6 md:p-8 bg-muted/15 max-w-4xl">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "email"].map((field) => (
                  <div key={field}>
                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input id={field} placeholder={`Enter your ${field}`} type={field === "email" ? "email" : "text"} value={formData[field as keyof IContactUsForm]} onChange={handleChange} />
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is your message about?" value={formData.subject} onChange={handleChange} className="dark:bg-transparent" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="How can we help you?" value={formData.message} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="role">I am a:</Label>
                <RadioGroup className="flex flex-row gap-4" value={formData.role} onValueChange={handleRoleChange}>
                  {["Student", "Parent", "Educator"].map((role) => (
                    <RadioGroupItem key={role} value={role}>
                      <Label htmlFor={role} className="text-sm ">{role}</Label>
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Card>

          <Card className="p-6 bg-primary/20  max-w-4xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-30 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full opacity-30 transform -translate-x-16 translate-y-16"></div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail size={20} />
                <div>
                  <p>Email</p>
                  <a href="mailto:support@collegeai.com" className="underline">support@collegeai.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} />
                <div>
                  <p>Phone</p>
                  <p>+91 99999 88888</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} />
                <div>
                  <p>Location</p>
                  <p>Bangalore, Karnataka 560066, India</p>
                </div>
              </div>
            </div>
            <div className="mt-12 flex gap-4 absolute bottom-6 left-1/2 transform -translate-x-1/2">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Button key={i} variant="ghost" size="icon" className="rounded-full">
                  <Icon size={20} />
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;