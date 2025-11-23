export type ServiceStatus = "healthy" | "unhealthy" | "degraded";
export type LifecycleStage = "Development" | "Staging" | "Production" | "Deprecated";

export interface Repository {
  name: string;
  type: "github" | "gitlab" | "bitbucket" | "other";
  url: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  language: string;
  framework?: string;
  version: string;
  status: ServiceStatus;
  lastDeployed: string;
  lifecycle: LifecycleStage;
  repository: string; // Main repository URL
  developer: string; // Owner/Developer name
  team: string; // Team name
  businessDomain?: string;
  product?: string;
  tier?: string;
  tags: string[];
  repositories: Repository[]; // List of related repositories
  aliases: string[];
  
  // Operational/Monitoring fields (Mocked for now)
  ciCdPipeline?: string;
  pipelineStatus?: "success" | "failed" | "running";
  lastPipelineRun?: string;
  environment?: string;
  healthCheck?: string; // e.g., "Passing"
  uptime?: string; // e.g., "99.9%"
  endpoints?: number;
}

export type NewServiceInput = Omit<Service, "id" | "status" | "lastDeployed" | "repositories" | "aliases" | "tags"> & {
  tags?: string[];
  aliases?: string[];
  repositories?: Repository[];
};

