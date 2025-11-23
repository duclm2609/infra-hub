import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, GitBranch, FileEdit, LayoutTemplate } from "lucide-react";
import { ManualForm } from "./ManualForm";
import { GitImportForm } from "./GitImportForm";
import { ScaffoldForm } from "./ScaffoldForm";

export function ServiceCreate() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Service</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual" className="gap-2">
                <FileEdit className="h-4 w-4" />
                Manual Entry
            </TabsTrigger>
            <TabsTrigger value="git" className="gap-2">
                <GitBranch className="h-4 w-4" />
                Import from Git
            </TabsTrigger>
            <TabsTrigger value="scaffold" className="gap-2">
                <LayoutTemplate className="h-4 w-4" />
                Scaffold New
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="manual">
                <ManualForm onSuccess={handleSuccess} />
            </TabsContent>
            
            <TabsContent value="git">
                <GitImportForm onSuccess={handleSuccess} />
            </TabsContent>
            
            <TabsContent value="scaffold">
                <ScaffoldForm onSuccess={handleSuccess} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

