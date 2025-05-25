import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { 
  HardHat, 
  Menu, 
  X, 
  Play, 
  Download, 
  Phone, 
  Mail, 
  MapPin,
  Fingerprint,
  Truck,
  Package,
  CheckSquare,
  TrendingUp,
  FileText,
  Smartphone,
  Shield,
  RefreshCw,
  Wifi,
  Brain,
  Cloud,
  Satellite,
  Star,
  Video,
  Bot,
  Plane,
  Sun,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Check,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  companySize: z.string().optional(),
  message: z.string().optional(),
});

const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const { toast } = useToast();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      companySize: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Demo Request Sent!",
        description: "Thank you for your interest! We will contact you soon to schedule your demo.",
      });
      contactForm.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      return apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the Waitlist!",
        description: "We'll notify you when new features are available.",
      });
      setWaitlistEmail("");
    },
    onError: () => {
      toast({
        title: "Error", 
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onContactSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      waitlistMutation.mutate({ email: waitlistEmail });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <HardHat className="text-buildtrack-secondary h-8 w-8 mr-3" />
              <span className="text-2xl font-bold text-buildtrack-neutral">BuildTrack</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-buildtrack-neutral hover:text-buildtrack-primary transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("solutions")}
                className="text-buildtrack-neutral hover:text-buildtrack-primary transition-colors"
              >
                Solutions
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-buildtrack-neutral hover:text-buildtrack-primary transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-buildtrack-neutral hover:text-buildtrack-primary transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-buildtrack-primary text-white hover:bg-blue-700"
              >
                Request Demo
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-buildtrack-neutral hover:text-buildtrack-primary py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("solutions")}
                className="block w-full text-left text-buildtrack-neutral hover:text-buildtrack-primary py-2"
              >
                Solutions
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left text-buildtrack-neutral hover:text-buildtrack-primary py-2"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-buildtrack-neutral hover:text-buildtrack-primary py-2"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-buildtrack-primary text-white hover:bg-blue-700 mt-2"
              >
                Request Demo
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 gradient-bg text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Transform Your Construction Site Management
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Streamline operations, track labor attendance with biometric verification,
                manage fleet vehicles in real-time, and boost productivity with our
                comprehensive construction management platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-buildtrack-secondary text-white hover:bg-orange-600"
                  onClick={() => scrollToSection("contact")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => scrollToSection("contact")}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </div>
              <div className="mt-8 flex items-center text-blue-100">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm">Trusted by 500+ construction companies</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=600"
                alt="Modern construction technology dashboard interface"
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "98%", label: "Attendance Accuracy", color: "text-buildtrack-primary" },
              { stat: "50%", label: "Time Savings", color: "text-buildtrack-secondary" },
              { stat: "24/7", label: "Real-time Tracking", color: "text-buildtrack-accent" },
              { stat: "500+", label: "Active Sites", color: "text-buildtrack-primary" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="animate-on-scroll"
              >
                <div className={`text-4xl font-bold ${item.color} mb-2`}>{item.stat}</div>
                <div className="text-buildtrack-neutral">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-buildtrack-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-buildtrack-neutral mb-6">
              Comprehensive Construction Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your construction projects efficiently,
              from labor tracking to fleet management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Fingerprint,
                title: "Biometric Attendance",
                description: "Track labor attendance with advanced biometric verification including fingerprint, facial recognition, and RFID integration.",
                features: ["Geolocation verification", "Multi-language support", "Real-time clock in/out"],
                color: "text-buildtrack-primary",
                bgColor: "bg-blue-50",
              },
              {
                icon: Truck,
                title: "Fleet Management",
                description: "Monitor vehicle locations, track maintenance schedules, and optimize fleet operations with real-time GPS tracking.",
                features: ["Real-time GPS tracking", "Maintenance scheduling", "Usage statistics"],
                color: "text-buildtrack-secondary",
                bgColor: "bg-orange-50",
              },
              {
                icon: Package,
                title: "Inventory & Procurement",
                description: "Manage materials, track inventory levels, and streamline procurement processes with automated reorder points.",
                features: ["Material tracking", "Automated reordering", "Supplier management"],
                color: "text-buildtrack-accent",
                bgColor: "bg-green-50",
              },
              {
                icon: CheckSquare,
                title: "Task Management",
                description: "Assign tasks, track progress, and ensure project milestones are met with comprehensive project management tools.",
                features: ["Progress tracking", "Team collaboration", "Deadline management"],
                color: "text-buildtrack-primary",
                bgColor: "bg-blue-50",
              },
              {
                icon: TrendingUp,
                title: "Financial Tracking",
                description: "Monitor project costs, track expenses, and generate detailed financial reports for better budget management.",
                features: ["Cost tracking", "Budget management", "Financial reporting"],
                color: "text-buildtrack-secondary",
                bgColor: "bg-orange-50",
              },
              {
                icon: FileText,
                title: "Document Management",
                description: "Store, organize, and share project documents securely with version control and access permissions.",
                features: ["Secure storage", "Version control", "Access permissions"],
                color: "text-buildtrack-accent",
                bgColor: "bg-green-50",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-buildtrack-neutral mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-buildtrack-accent mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-buildtrack-neutral mb-6">
              Built for Every Construction Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From small contractors to large construction companies, our platform scales with your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Construction site workers using modern technology for project management"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile-First Design",
                  description: "Access all features on-the-go with our responsive mobile app. Perfect for field workers and site managers.",
                  color: "text-buildtrack-primary",
                  bgColor: "bg-blue-50",
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level security with encrypted data transmission and secure biometric authentication systems.",
                  color: "text-buildtrack-secondary",
                  bgColor: "bg-orange-50",
                },
                {
                  icon: RefreshCw,
                  title: "Real-Time Sync",
                  description: "Instant synchronization across all devices and platforms. Your team always has the latest information.",
                  color: "text-buildtrack-accent",
                  bgColor: "bg-green-50",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-buildtrack-neutral mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-buildtrack-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-buildtrack-neutral">Advanced Technology Stack</h2>
                <p className="text-xl text-gray-600">
                  Built with cutting-edge technology to deliver superior performance,
                  reliability, and scalability for your construction operations.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Wifi, title: "IoT Integration", color: "text-buildtrack-primary" },
                  { icon: Brain, title: "AI Analytics", color: "text-buildtrack-secondary" },
                  { icon: Cloud, title: "Cloud Native", color: "text-buildtrack-accent" },
                  { icon: Satellite, title: "Real-time GPS", color: "text-buildtrack-primary" },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <tech.icon className={`h-8 w-8 ${tech.color} mx-auto mb-3`} />
                    <h4 className="font-semibold text-buildtrack-neutral">{tech.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern construction equipment with integrated technology systems"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl font-bold text-buildtrack-neutral mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">
              See how construction companies are transforming their operations with BuildTrack.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "BuildTrack has revolutionized our site management. The biometric attendance feature alone has saved us countless hours in payroll processing.",
                name: "Sarah Johnson",
                title: "Project Manager, Metro Construction",
              },
              {
                quote: "The fleet management system gives us complete visibility into our vehicles. We've reduced maintenance costs by 30% since implementing BuildTrack.",
                name: "Michael Chen",
                title: "Operations Director, BuildCorp",
              },
              {
                quote: "The real-time monitoring capabilities have improved our project delivery times significantly. Highly recommend for any construction company.",
                name: "Emily Rodriguez",
                title: "CEO, Premier Builders",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex text-buildtrack-secondary mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                      <div>
                        <div className="font-semibold text-buildtrack-neutral">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.title}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Coming Soon</h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              We're continuously innovating to bring you even more powerful features
              for construction site management.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { icon: Video, title: "CCTV Integration", description: "Live streaming and recording capabilities" },
                { icon: Bot, title: "AI Progress Analysis", description: "Automated project progress tracking" },
                { icon: Plane, title: "Drone Monitoring", description: "Aerial site surveys and monitoring" },
                { icon: Sun, title: "Weather Integration", description: "Weather-based planning and alerts" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
                <p className="text-blue-100 mb-6">
                  Join our early access program and get notified when these features become available.
                </p>
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-blue-200 focus:ring-white/50"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={waitlistMutation.isPending}
                    className="bg-buildtrack-secondary text-white hover:bg-orange-600 whitespace-nowrap"
                  >
                    {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-buildtrack-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-buildtrack-neutral mb-6">
                Ready to Transform Your Construction Management?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Schedule a personalized demo and see how BuildTrack can streamline
                your construction operations.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567", color: "text-buildtrack-primary", bgColor: "bg-blue-50" },
                  { icon: Mail, title: "Email Us", info: "sales@buildtrack.com", color: "text-buildtrack-secondary", bgColor: "bg-orange-50" },
                  { icon: MapPin, title: "Visit Us", info: "123 Construction Ave, Building City, BC 12345", color: "text-buildtrack-accent", bgColor: "bg-green-50" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-12 h-12 ${contact.bgColor} rounded-xl flex items-center justify-center mr-4`}>
                      <contact.icon className={`h-6 w-6 ${contact.color}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-buildtrack-neutral">{contact.title}</div>
                      <div className="text-gray-600">{contact.info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-buildtrack-neutral mb-6">Request a Demo</h3>
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={contactForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="First Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Last Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="email" placeholder="Email Address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="tel" placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Company Size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                <SelectItem value="200+">200+ employees</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={contactForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your construction management needs..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-buildtrack-primary text-white hover:bg-blue-700"
                        disabled={contactMutation.isPending}
                      >
                        <CalendarCheck className="mr-2 h-5 w-5" />
                        {contactMutation.isPending ? "Scheduling..." : "Schedule Demo"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-buildtrack-neutral text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-6">
                <HardHat className="text-buildtrack-secondary h-8 w-8 mr-3" />
                <span className="text-2xl font-bold">BuildTrack</span>
              </div>
              <p className="text-gray-400 mb-6">
                The complete construction site management platform for modern builders.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2024 BuildTrack. All rights reserved.
              </div>
              <div className="flex space-x-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
