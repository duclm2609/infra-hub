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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServiceStore } from "@/store/serviceStore";
import type { Service, LifecycleStage } from "@/types/service";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  owner: z.string().min(2, {
    message: "Owner name is required.",
  }),
  team: z.string().min(2, {
    message: "Team name is required.",
  }),
  repositoryUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  language: z.string().min(1, {
    message: "Please select a language.",
  }),
  lifecycle: z.enum(["Development", "Staging", "Production", "Deprecated"]),
});

interface ManualFormProps {
  onSuccess: () => void;
}

export function ManualForm({ onSuccess }: ManualFormProps) {
  const addService = useServiceStore((state) => state.addService);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      owner: "",
      team: "",
      repositoryUrl: "",
      language: "",
      lifecycle: "Development",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newService: Service = {
      id: Math.floor(Math.random() * 10000) + 100, // Random ID for MVP
      name: values.name,
      description: values.description,
      developer: values.owner,
      team: values.team,
      repository: values.repositoryUrl,
      language: values.language,
      lifecycle: values.lifecycle as LifecycleStage,
      status: "healthy", // Default status
      lastDeployed: new Date().toISOString().split("T")[0],
      version: "0.1.0",
      tags: [],
      repositories: [
        {
          name: "Main Repo",
          type: "github",
          url: values.repositoryUrl,
        },
      ],
      aliases: [],
      healthCheck: "Unknown",
      uptime: "0%",
    };

    addService(newService);
    form.reset();
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., User Service" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Go">Go</SelectItem>
                    <SelectItem value="C#">C#</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this service does..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner / Developer</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Nguyen Van A" {...field} />
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
                <FormLabel>Team</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Backend Team" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="repositoryUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repository URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lifecycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lifecycle Stage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Register Service</Button>
        </div>
      </form>
    </Form>
  );
}
