import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "./ui/button";

export default function AcademicInformationForm() {
  return (
    <Card className="p-4 mt-6 bg-muted/50">
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
        <p className="text-sm text-muted-foreground">Update your academic performance and educational preferences.</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <Label>Current Education Level</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School (12th Grade)</SelectItem>
              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Year of Graduation (Expected)</Label>
          <Input placeholder="2024" />
        </div>
        <div>
          <Label>Grading System</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select grading system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="gpa">GPA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Current Grade/Percentage</Label>
          <Input placeholder="89.5%" />
        </div>
        <div className="col-span-2">
          <Label>Preferred Stream</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="computer-science">Computer Science Engineering</SelectItem>
              <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <Button>
            Save
        </Button>
    </Card>
  );
}
