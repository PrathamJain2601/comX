import {
  Calendar,
  MapPin,
  Link,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  User,
  Phone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function PersonalInfo() {
  if (!user.isLoggedIn) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Not Logged In</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please log in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-xl border border-gray-200">
      <CardHeader className="flex flex-col items-center text-center space-y-2">
        <Avatar className="w-24 h-24 mb-3 rounded-full shadow-lg">
          <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
          <AvatarFallback className="flex items-center justify-center bg-muted-foreground text-background w-full h-full rounded-full font-semibold">
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
        <div className="text-muted-foreground text-sm">@{user.username}</div>
        <p className="text-xs font-medium uppercase tracking-wider bg-secondary text-secondary-foreground px-3 py-1 rounded-md">
          {user.designation}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center text-muted-foreground">{user.bio}</div>
        <Separator />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{user.stats.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{user.stats.following}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{user.stats.projects}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{user.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 text-muted-foreground" />
            <a
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {user.website}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Joined {user.joinDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>ID: {user.id}</span>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Skill Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="w-full" />
          </div>
        </div>
        <Separator />
        <div className="flex justify-center space-x-4">
          {user.socialLinks.twitter && (
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter profile</span>
              </Button>
            </a>
          )}
          {user.socialLinks.github && (
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub profile</span>
              </Button>
            </a>
          )}
          {user.socialLinks.linkedin && (
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn profile</span>
              </Button>
            </a>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit Profile</Button>
        <Button variant="destructive">Logout</Button>
      </CardFooter>
    </Card>
  );
}

const user = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  designation: "Senior Software Engineer",
  company: "Tech Innovations Inc.",
  location: "San Francisco, CA",
  website: "https://johndoe.com",
  bio: "Passionate about creating innovative solutions and mentoring junior developers. Always learning and exploring new technologies.",
  joinDate: "January 2020",
  isLoggedIn: true,
  id: 1,
  avatar: "/placeholder.svg?height=200&width=200",
  skills: ["React", "Node.js", "TypeScript", "GraphQL", "AWS"],
  socialLinks: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  stats: {
    followers: 1234,
    following: 567,
    projects: 89,
  },
};
