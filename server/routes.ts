import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactRequestSchema, insertWaitlistSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const contactRequest = await storage.createContactRequest(validatedData);
      res.json({ success: true, id: contactRequest.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact request" 
        });
      }
    }
  });

  // Waitlist signup
  app.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = insertWaitlistSignupSchema.parse(req.body);
      const signup = await storage.createWaitlistSignup(validatedData);
      res.json({ success: true, id: signup.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid email format", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to join waitlist" 
        });
      }
    }
  });

  // Get contact requests (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contact requests" 
      });
    }
  });

  // Get waitlist signups (for admin purposes)
  app.get("/api/waitlist", async (req, res) => {
    try {
      const signups = await storage.getWaitlistSignups();
      res.json(signups);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch waitlist signups" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
