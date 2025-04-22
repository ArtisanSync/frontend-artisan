import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { team } from "@/constants/people";
import { images } from "@/constants/images";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter, Mail, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeamSection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-16">
          <Badge variant="outline" className="px-4 py-1 text-sm rounded-full">
            Our Experts
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full my-3"></div>
          <p className="max-w-[600px] text-muted-foreground text-lg">
            Talented professionals building exceptional experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {team.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group rounded-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                  <Image
                    src={images[member.image]}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-t-2xl"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    priority
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-between flex-grow bg-card rounded-b-2xl">
                  <div>
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <CardDescription className="text-md font-medium text-primary">
                      {member.position}
                    </CardDescription>
                    <div className="h-0.5 w-12 bg-primary/40 my-3 rounded-full"></div>
                    <p className="text-muted-foreground text-sm mt-3">
                      Specializing in creating innovative solutions with a
                      passion for clean code and seamless user experiences.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 hover:bg-primary hover:text-white transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 hover:bg-primary hover:text-white transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 hover:bg-primary hover:text-white transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 hover:bg-primary hover:text-white transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <div className="ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full gap-1.5 px-3"
                      >
                        Profile <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
