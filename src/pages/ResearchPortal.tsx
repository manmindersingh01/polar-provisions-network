import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  researchProjects,
  getFormattedResearchUpdates,
  getProjectById,
  getUpdatesByProjectId } from
"@/data/researchData";
import { formatDate } from "@/lib/utils";
import { Microscope, Users, Calendar1 as Calendar, Tag, MapPin, FileText, Search, Clock, User, ChevronRight, ArrowLeft, FileImage, File, FileSpreadsheet, FilePen, FileText as FileCsv } from "lucide-react";

export function ResearchPortal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const updates = getFormattedResearchUpdates();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "planning":
        return "bg-info text-info-foreground";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "on-hold":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <FileImage className="h-4 w-4" />;
    if (type.includes("pdf")) return <File className="h-4 w-4" />;
    if (type.includes("spreadsheet")) return <FileSpreadsheet className="h-4 w-4" />;
    if (type.includes("csv")) return <FileCsv className="h-4 w-4" />;
    if (type.includes("text")) return <FilePen className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const filteredProjects = researchProjects.filter((project) =>
  project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
  project.team.some((member) => member.toLowerCase().includes(searchTerm.toLowerCase())) ||
  project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredUpdates = updates.filter((update) =>
  update.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
  update.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
  update.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedProject) {
    const project = getProjectById(selectedProject);
    const projectUpdates = getUpdatesByProjectId(selectedProject);

    if (!project) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedProject(null)}
            className="mb-4">

            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-1">Project Not Found</h3>
            <p className="text-muted-foreground">
              The requested project could not be found.
            </p>
          </div>
        </div>);

    }

    return (
      <div>
        <PageHeader
          title={project.title}
          description={project.description}>

          <Button
            variant="outline"
            onClick={() => setSelectedProject(null)}>

            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </PageHeader>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DataCard title="Project Updates" icon={<FileText className="h-5 w-5" />}>
                {projectUpdates.length > 0 ?
                <div className="space-y-6 mt-2">
                    {projectUpdates.map((update) =>
                  <div key={update.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarFallback>
                              {update.author.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{update.author}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatDate(update.timestamp)}
                            </div>
                          </div>
                        </div>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <p>{update.content}</p>
                        </div>
                        {update.attachments && update.attachments.length > 0 &&
                    <div className="mt-3">
                            <p className="text-sm font-medium mb-2">Attachments:</p>
                            <div className="flex flex-wrap gap-2">
                              {update.attachments.map((attachment, index) =>
                        <a
                          key={index}
                          href={attachment.url}
                          className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80">

                                  {getFileIcon(attachment.type)}
                                  {attachment.name}
                                </a>
                        )}
                            </div>
                          </div>
                    }
                      </div>
                  )}
                  </div> :

                <div className="text-center py-8">
                    <p className="text-muted-foreground">No updates available for this project.</p>
                  </div>
                }
              </DataCard>
            </div>
            
            <div>
              <DataCard title="Project Details" icon={<Microscope className="h-5 w-5" />}>
                <div className="space-y-4 mt-2">
                  <div>
                    <Badge className={getStatusColor(project.status)}>
                      <span className="capitalize">{project.status}</span>
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lead Researcher</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{project.lead}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Team Members</p>
                    <div className="flex flex-wrap gap-2">
                      {project.team.map((member, index) =>
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {member}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Start: {formatDate(project.startDate)}</span>
                      </div>
                      {project.endDate &&
                      <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>End: {formatDate(project.endDate)}</span>
                        </div>
                      }
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) =>
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DataCard>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div>
      <PageHeader
        title="Research Portal"
        description="Access research projects, updates, and data">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects and updates..."
            className="pl-9 h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="projects">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="updates">Recent Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) =>
              <div
                key={project.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project.id)}>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium">{project.title}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        <span className="capitalize">{project.status}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{project.lead}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {formatDate(project.startDate)}
                          {project.endDate && ` - ${formatDate(project.endDate)}`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, index) =>
                    <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                    )}
                    </div>
                    
                    <Button
                    variant="ghost"
                    className="w-full mt-4 justify-between"
                    onClick={() => setSelectedProject(project.id)}>

                      View Project Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {filteredProjects.length === 0 &&
              <div className="col-span-full text-center py-12">
                  <Microscope className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Projects Found</h3>
                  <p className="text-muted-foreground">
                    No research projects match your search criteria.
                  </p>
                </div>
              }
            </div>
          </TabsContent>
          
          <TabsContent value="updates" className="mt-0">
            <DataCard title="Recent Research Updates" icon={<FileText className="h-5 w-5" />}>
              {filteredUpdates.length > 0 ?
              <div className="space-y-6 mt-2">
                  {filteredUpdates.map((update) =>
                <div key={update.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback>
                            {update.author.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{update.author}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {update.formattedDate}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                    variant="link"
                    className="p-0 h-auto text-primary font-medium mb-2"
                    onClick={() => setSelectedProject(update.projectId)}>

                        {update.project}
                      </Button>
                      
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <p>{update.content}</p>
                      </div>
                      
                      {update.attachments && update.attachments.length > 0 &&
                  <div className="mt-3">
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {update.attachments.map((attachment, index) =>
                      <a
                        key={index}
                        href={attachment.url}
                        className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md hover:bg-muted/80">

                                {getFileIcon(attachment.type)}
                                {attachment.name}
                              </a>
                      )}
                          </div>
                        </div>
                  }
                    </div>
                )}
                </div> :

              <div className="text-center py-8">
                  <p className="text-muted-foreground">No updates match your search criteria.</p>
                </div>
              }
            </DataCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>);

}