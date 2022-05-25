export enum Committees {
  "studio" = "studio",
  "acm-icpc" = "acm-icpc",
  "design" = "design",
  "cyber" = "cyber",
  "teach-la" = "teach-la",
  "w" = "w",
  "ai" = "ai",
  "acm-hack" = "acm-hack",
  "jedi" = "jedi",
  "impact" = "impact",
  "internal" = "internal",
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
  internal: true,
  "teach-la": true,
  "acm-hack": true,
}; // Default values

export const committees = Object.keys(Committees);

export const sites: CommitteeSites = {
  internal: [
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
  w: [
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
  design: [
    {
      description:
        "Foundational guidelines for developers and designers on how to represent ACM's identity, created by the ACM Design Team",
      url: "https://design.uclaacm.com",
    },
  ],
  impact: [
    {
      description: "Official Page of ACM's Impact Initiative",
      url: "https://acm.cs.ucla.edu",
    },
  ],
  jedi: [
    {
      description: "Official Page of ACM's JEDI Initiative",
      url: "https://acm.cs.ucla.edu",
    },
  ],
};
