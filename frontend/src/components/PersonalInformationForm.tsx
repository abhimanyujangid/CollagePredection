import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "./ui/button";

export default function PersonalInformationForm() {
  return (
    <Card className="p-4 bg-muted/50">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <p className="text-sm text-muted-foreground">Update your personal details and preferences.</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Label>First name</Label>
          <Input placeholder="John" />
        </div>
        <div>
          <Label>Last name</Label>
          <Input placeholder="Smith" />
        </div>
        <div className="col-span-2">
          <Label>Email address</Label>
          <Input type="email" placeholder="john.smith@example.com" />
        </div>
        <div>
          <Label>Country</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="India">India</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label>Street address</Label>
          <Input placeholder="123 University Road" />
        </div>
        <div>
          <Label>City</Label>
          <Input placeholder="Mumbai" />
        </div>
        <div>
          <Label>State / Province</Label>
          <Input placeholder="Maharashtra" />
        </div>
        <div>
          <Label>ZIP / Postal code</Label>
          <Input placeholder="400001" />
        </div>
       
      </CardContent>
      <Button>
            Save
        </Button>
    </Card>
  );
}
