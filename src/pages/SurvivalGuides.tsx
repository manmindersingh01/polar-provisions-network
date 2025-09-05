import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataCard } from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { survivalGuides, getGuideById, getGuidesByCategory, searchGuides } from "@/data/guideData";
import { formatDate } from "@/lib/utils";
import { BookOpen, Search, ArrowLeft, Triangle as AlertTriangle, Stethoscope, Wrench, Compass, Shield, Tag, Calendar1 as Calendar, ChevronRight } from "lucide-react";

// Instead of importing react-markdown, we'll create a simple markdown renderer component
const ReactMarkdown = ({ children }: { children: string }) => {
  // This is a simple implementation that just renders the text
  // In a real app, you would use a proper markdown parser
  return <div className="whitespace-pre-wrap">{children}</div>;
};

export function SurvivalGuides() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-accent text-accent-foreground";
      case "high":
        return "bg-warning text-warning-foreground";
      case "medium":
        return "bg-info text-info-foreground";
      case "low":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emergency":
        return <AlertTriangle className="h-5 w-5" />;
      case "medical":
        return <Stethoscope className="h-5 w-5" />;
      case "equipment":
        return <Wrench className="h-5 w-5" />;
      case "survival":
        return <Shield className="h-5 w-5" />;
      case "navigation":
        return <Compass className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const filteredGuides = searchTerm ?
  searchGuides(searchTerm) :
  survivalGuides;

  if (selectedGuide) {
    const guide = getGuideById(selectedGuide);

    if (!guide) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="outline"
            onClick={() => setSelectedGuide(null)}
            className="mb-4">

            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Button>
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-1">Guide Not Found</h3>
            <p className="text-muted-foreground">
              The requested guide could not be found.
            </p>
          </div>
        </div>);

    }

    return (
      <div>
        <PageHeader
          title={guide.title}
          description={guide.summary}>

          <Button
            variant="outline"
            onClick={() => setSelectedGuide(null)}>

            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Button>
        </PageHeader>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <DataCard
                title="Guide Content"
                icon={getCategoryIcon(guide.category)}
                className="prose prose-sm md:prose-base max-w-none dark:prose-invert">

                <ReactMarkdown>{guide.content}</ReactMarkdown>
              </DataCard>
            </div>
            
            <div>
              <DataCard title="Guide Details" icon={<BookOpen className="h-5 w-5" />}>
                <div className="space-y-4 mt-2">
                  <div>
                    <Badge className={getPriorityColor(guide.priority)}>
                      <span className="capitalize">{guide.priority} Priority</span>
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(guide.category)}
                      <span className="capitalize">{guide.category}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(guide.lastUpdated)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.tags.map((tag, index) =>
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {tag}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DataCard>
              
              <div className="mt-6">
                {guide.priority === "critical" &&
                <div className="alert-error mb-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        This is a critical protocol. Review regularly.
                      </span>
                    </div>
                  </div>
                }
                
                {guide.priority === "high" &&
                <div className="alert-warning mb-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">
                        This is a high priority guide. Familiarize thoroughly.
                      </span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div>
      <PageHeader
        title="Survival Guides"
        description="Essential protocols and guides for extreme polar environments">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search guides..."
            className="pl-9 h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        {searchTerm ?
        <div>
            <h2 className="text-xl font-medium mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) =>
            <div
              key={guide.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-colors cursor-pointer"
              onClick={() => setSelectedGuide(guide.id)}>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        {getCategoryIcon(guide.category)}
                        <h3 className="text-lg font-medium ml-2">{guide.title}</h3>
                      </div>
                      <Badge className={getPriorityColor(guide.priority)}>
                        <span className="capitalize">{guide.priority}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {guide.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {guide.tags.slice(0, 3).map((tag, index) =>
                  <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                  )}
                      {guide.tags.length > 3 &&
                  <Badge variant="outline" className="text-xs">
                          +{guide.tags.length - 3} more
                        </Badge>
                  }
                    </div>
                    
                    <Button
                  variant="ghost"
                  className="w-full mt-4 justify-between"
                  onClick={() => setSelectedGuide(guide.id)}>

                      View Guide
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
            )}
              
              {filteredGuides.length === 0 &&
            <div className="col-span-full text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Guides Found</h3>
                  <p className="text-muted-foreground">
                    No guides match your search criteria.
                  </p>
                </div>
            }
            </div>
          </div> :

        <Tabs defaultValue="emergency">
            <TabsList className="mb-6">
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="survival">Survival</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>
            
            {["emergency", "medical", "equipment", "survival", "navigation"].map((category) =>
          <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getGuidesByCategory(category).map((guide) =>
              <div
                key={guide.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-colors cursor-pointer"
                onClick={() => setSelectedGuide(guide.id)}>

                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-medium">{guide.title}</h3>
                          <Badge className={getPriorityColor(guide.priority)}>
                            <span className="capitalize">{guide.priority}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">
                          {guide.summary}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {guide.tags.slice(0, 3).map((tag, index) =>
                    <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                    )}
                          {guide.tags.length > 3 &&
                    <Badge variant="outline" className="text-xs">
                              +{guide.tags.length - 3} more
                            </Badge>
                    }
                        </div>
                        
                        <Button
                    variant="ghost"
                    className="w-full mt-4 justify-between"
                    onClick={() => setSelectedGuide(guide.id)}>

                          View Guide
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
              )}
                  
                  {getGuidesByCategory(category).length === 0 &&
              <div className="col-span-full text-center py-12">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">No Guides Available</h3>
                      <p className="text-muted-foreground">
                        No guides are available in this category.
                      </p>
                    </div>
              }
                </div>
              </TabsContent>
          )}
          </Tabs>
        }
      </div>
    </div>);

}