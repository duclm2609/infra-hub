import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useServiceStore } from "@/store/serviceStore";
import type { Service } from "@/types/service";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  template: z.string().min(1, {
    message: "Please select a template.",
  }),
  team: z.string().min(2, {
    message: "Team name is required.",
  }),
});

interface ScaffoldFormProps {
  onSuccess: () => void;
}

const TEMPLATES = [
  {
    id: "react-frontend",
    name: "React Frontend",
    description: "Vite, React, TypeScript, TailwindCSS, Shadcn UI",
    language: "TypeScript",
    framework: "React",
  },
  {
    id: "go-backend",
    name: "Go Backend",
    description: "Go 1.21, Gin, GORM, Docker",
    language: "Go",
    framework: "Gin",
  },
  {
    id: "python-service",
    name: "Python Service",
    description: "Python 3.11, FastAPI, SQLAlchemy",
    language: "Python",
    framework: "FastAPI",
  },
  {
    id: "java-spring",
    name: "Java Spring Boot",
    description: "Java 17, Spring Boot 3, Gradle",
    language: "Java",
    framework: "Spring Boot",
  },
];

export function ScaffoldForm({ onSuccess }: ScaffoldFormProps) {
  const addService = useServiceStore((state) => state.addService);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      template: "",
      team: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const template = TEMPLATES.find(t => t.id === values.template);
    if (!template) return;

    const newService: Service = {
      id: Math.floor(Math.random() * 10000) + 100,
      name: values.name,
      description: `Scaffolded from ${template.name} template. ${template.description}`,
      developer: "Scaffolder Bot",
      team: values.team,
      repository: `https://github.com/company/${values.name.toLowerCase().replace(/\s+/g, "-")}`,
      language: template.language,
      framework: template.framework,
      lifecycle: "Development",
      status: "healthy",
      lastDeployed: new Date().toISOString().split("T")[0],
      version: "0.0.1",
      tags: ["scaffolded", "template"],
      repositories: [],
      aliases: [],
      healthCheck: "Pending",
      uptime: "0%",
    };

    addService(newService);
    form.reset();
    onSuccess();
  }

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplateId(id);
    form.setValue("template", id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="space-y-3">
            <FormLabel>Select a Template</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEMPLATES.map((template) => (
                    <Card 
                        key={template.id} 
                        className={`cursor-pointer hover:border-primary transition-colors ${selectedTemplateId === template.id ? "border-primary bg-primary/5" : ""}`}
                        onClick={() => handleTemplateSelect(template.id)}
                    >
                        <CardContent className="p-4 flex items-start justify-between">
                            <div>
                                <div className="font-medium">{template.name}</div>
                                <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                            </div>
                            {selectedTemplateId === template.id && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            {form.formState.errors.template && (
                 <p className="text-sm font-medium text-destructive">{form.formState.errors.template.message}</p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Order Service" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Team</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Order Team" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!selectedTemplateId}>
            Create Service
          </Button>
        </div>
      </form>
    </Form>
  );
}

