export enum Committees {
  "Studio" = "Studio",
  "acm-icpc" = "acm-icpc",
  "Design" = "Design",
  "cyber" = "cyber",
  "teach-la" = "teach-la",
  "W" = "W",
  "ai" = "ai",
  "acm-hack" = "acm-hack",
  "JEDI" = "JEDI",
  "Impact" = "Impact",
  "Internal" = "Internal",
  "no-topic" = "no-topic",
}

export interface PageInfo {
  url: string;
  description: string;
  statusPath?: string;
}

export type CommitteeSites = {
  [committee in Committees]?: PageInfo[];
};

export type CommitteeDict = {
  [committee in Committees]?: any;
};

export type CommitteeHashType = {
  [committee in Committees]?: boolean;
};

export const defaultCommitteeHash: CommitteeHashType = {
  Internal: true,
  "teach-la": true,
  "acm-hack": true,
}; // Default values

export const committees = Object.keys(Committees);

export const sites: CommitteeSites = {
  Internal: [
    {
      description:
        "The official website for ACM at UCLA, the largest tech community on campus!",
      url: "https://www.uclaacm.com",
    },
    {
      description: "Vanity URL creator for ACM",
      url: "http://links.uclaacm.com",
    },
  ],
  "teach-la": [
    {
      description: "🌱a website showcasing how awesome Teach LA is!",
      url: "https://teachla.uclaacm.com",
    },
  ],
  "acm-hack": [
    {
      description: "Official website of ACM Hack",
      url: "https://hack.uclaacm.com",
    },
  ],
  "acm-icpc": [
    {
      description: "Official Website for ACM ICPC at UCLA",
      url: "https://icpc.uclaacm.com/",
    },
  ],
  W: [
    {
      description: "Official Website of ACM-W at UCLA",
      url: "https://w.uclaacm.com",
    },
  ],
  ai: [
    {
      description: "ACM AI's tech blog",
      url: "https://uclaacmai.github.io",
    },
  ],
  cyber: [
    {
      description: "CTF Platform!",
      url: "https://acmcyber.com",
    },
  ],
  Design: [
    {
      description:
        "Foundational guidelines for developers and designers on how to represent ACM's identity, created by the ACM Design Team",
      url: "https://design.uclaacm.com",
    },
  ],
  Impact: [
    {
      description: "Official Page of ACM's Impact Initiative",
      url: "https://acm.cs.ucla.edu",
    },
  ],
  JEDI: [
    {
      description: "Official Page of ACM's JEDI Initiative",
      url: "https://acm.cs.ucla.edu",
    },
  ],
};
