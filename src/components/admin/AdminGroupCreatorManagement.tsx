
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface AdminManagedGroupCreator {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdGroups: { id: string; name: string }[];
  isManagementDisabled: boolean;
}

const mockGroupCreators: AdminManagedGroupCreator[] = [
  {
    id: "user1",
    name: "Coach John",
    email: "coach.john@example.com",
    avatarUrl: "https://placehold.co/40x40.png?text=CJ",
    createdGroups: [
      { id: "group1", name: "U12 Soccer Stars" },
      { id: "group2", name: "Weekend Training Squad" },
    ],
    isManagementDisabled: false,
  },
  {
    id: "user2",
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    avatarUrl: "https://placehold.co/40x40.png?text=SM",
    createdGroups: [{ id: "group3", name: "Photography Club" }],
    isManagementDisabled: false,
  },
  {
    id: "user5",
    name: "Alex P.",
    email: "alex.p@example.com",
    avatarUrl: "https://placehold.co/40x40.png?text=AP",
    createdGroups: [{ id: "group4", name: "Developers United" }],
    isManagementDisabled: true,
  },
];

export function AdminGroupCreatorManagement() {
  const [creators, setCreators] = useState<AdminManagedGroupCreator[]>(mockGroupCreators);
  const { toast } = useToast();

  const handleToggleAccess = async (creatorId: string, isDisabled: boolean) => {
    // Simulate API call to update status
    console.log(`Setting management for creator ${creatorId} to disabled: ${isDisabled}`);
    await new Promise(resolve => setTimeout(resolve, 750));

    setCreators(prevCreators =>
      prevCreators.map(c =>
        c.id === creatorId ? { ...c, isManagementDisabled: isDisabled } : c
      )
    );
    toast({
      title: "Access Updated",
      description: `Management access for ${creators.find(c=>c.id===creatorId)?.name} has been ${isDisabled ? 'disabled' : 'enabled'}.`,
    });
  };

  return (
    <Card className="shadow-lg rounded-xl border">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Users className="mr-3 h-6 w-6 text-primary" />
          Group Creator Access Control
        </CardTitle>
        <CardDescription>
          Manage group creators' ability to manage and communicate with the groups they created.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {creators.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No group creators found.</p>
        ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Creator</TableHead>
                <TableHead>Managed Groups</TableHead>
                <TableHead className="text-right w-[200px]">Disable Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creators.map((creator) => (
                <TableRow key={creator.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Image
                            src={creator.avatarUrl || `https://placehold.co/40x40.png?text=${creator.name.substring(0,1)}`}
                            alt={creator.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                            data-ai-hint="user avatar"
                        />
                        <div>
                            <div className="font-medium">{creator.name}</div>
                            <div className="text-xs text-muted-foreground">{creator.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {creator.createdGroups.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {creator.createdGroups.map(group => (
                          <Badge key={group.id} variant="secondary" className="text-xs">{group.name}</Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No groups created</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                        <Label htmlFor={`access-switch-${creator.id}`} className={cn("text-xs", creator.isManagementDisabled && "text-destructive")}>
                            {creator.isManagementDisabled ? "Disabled" : "Enabled"}
                        </Label>
                        <Switch
                        id={`access-switch-${creator.id}`}
                        checked={creator.isManagementDisabled}
                        onCheckedChange={(checked) => handleToggleAccess(creator.id, checked)}
                        aria-label={`Toggle management access for ${creator.name}`}
                        className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-green-500"
                        />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
