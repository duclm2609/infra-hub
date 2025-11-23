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
import { Loader2, Github } from "lucide-react";

const formSchema = z.object({
  repositoryUrl: z.string().url({
    message: "Please enter a valid Git repository URL.",
  }),
});

interface GitImportFormProps {
  onSuccess: () => void;
}

export function GitImportForm({ onSuccess }: GitImportFormProps) {
  const addService = useServiceStore((state) => state.addService);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repositoryUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to fetch catalog-info.yaml
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data parsed from a hypothetical catalog-info.yaml
      const repoName =
        values.repositoryUrl.split("/").pop()?.replace(".git", "") ||
        "imported-service";

      const newService: Service = {
        id: Math.floor(Math.random() * 10000) + 100,
        name:
          repoName.charAt(0).toUpperCase() +
          repoName.slice(1).replace(/-/g, " "),
        description:
          "Imported automatically from Git repository. Contains service logic and configuration.",
        developer: "Git User",
        team: "Platform Team",
        repository: values.repositoryUrl,
        language: "TypeScript", // Mock detection
        lifecycle: "Development",
        status: "healthy",
        lastDeployed: new Date().toISOString().split("T")[0],
        version: "0.0.1",
        tags: ["imported", "git"],
        repositories: [
          {
            name: "Source Code",
            type: "github",
            url: values.repositoryUrl,
          },
        ],
        aliases: [],
        healthCheck: "Pending",
        uptime: "0%",
        framework: "Unknown",
      };

      addService(newService);
      form.reset();
      onSuccess();
    } catch {
      setError(
        "Failed to import repository. Ensure the URL is correct and contains a catalog-info.yaml file."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-md border flex items-start gap-3">
        <Github className="h-5 w-5 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm">How Git Import Works</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Provide a repository URL. We will scan the repository for a{" "}
            <code>catalog-info.yaml</code> file to automatically populate
            service details.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="repositoryUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Git Repository URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/org/repo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Import Service"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
