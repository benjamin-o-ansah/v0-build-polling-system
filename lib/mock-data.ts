import type { User, Poll, ActivityItem } from "./types"

export const adminUser: User = {
  id: "usr_8829402_nx",
  name: "Sarah Jenning",
  email: "sarah.j@projectnexus.gov",
  role: "admin",
  roleLabel: "System Admin",
  avatar: "",
  memberSince: "October 24, 2024",
  status: "Active",
}

export const citizenUser: User = {
  id: "usr_7734201_nx",
  name: "Alex Chen",
  email: "alex.c@nexus.gov",
  role: "citizen",
  roleLabel: "Citizen",
  avatar: "",
  memberSince: "January 15, 2025",
  status: "Active",
}

export const polls: Poll[] = [
  {
    id: "poll-1",
    title: "Community Broadband Expansion 2025",
    description:
      "This poll aims to gather public feedback on the proposed broadband expansion for underserved areas in the community.",
    question: "Which broadband expansion plan do you prefer?",
    status: "active",
    options: [
      { id: "opt-1a", label: "Fiber Optic Network", votes: 542 },
      { id: "opt-1b", label: "5G Wireless Expansion", votes: 398 },
      { id: "opt-1c", label: "Hybrid Approach", votes: 344 },
    ],
    createdAt: "Jan 6, 2025",
    closesAt: "Closes in 3 days",
    totalVotes: 1284,
    responses: 1284,
  },
  {
    id: "poll-2",
    title: "Downtown Traffic Calming Pilot",
    description:
      "The city council is seeking citizen input on traffic calming measures for the downtown district.",
    question: "Which traffic calming measure should be prioritized?",
    status: "active",
    options: [
      { id: "opt-2a", label: "Speed Bumps & Raised Crosswalks", votes: 312 },
      { id: "opt-2b", label: "Bike Lane Expansion", votes: 287 },
      { id: "opt-2c", label: "Pedestrian-Only Zones", votes: 243 },
    ],
    createdAt: "Jan 2, 2025",
    closesAt: "Closes today",
    totalVotes: 842,
    responses: 842,
  },
  {
    id: "poll-3",
    title: "City Budget Priorities 2026",
    description:
      "Help us determine where the city should allocate funding for the upcoming fiscal year.",
    question: "Which priority area should receive the most funding in Q3?",
    status: "draft",
    options: [
      { id: "opt-3a", label: "Public Safety", votes: 0 },
      { id: "opt-3b", label: "Education", votes: 0 },
      { id: "opt-3c", label: "Infrastructure", votes: 0 },
      { id: "opt-3d", label: "Green Spaces & Parks Renovation", votes: 0 },
    ],
    createdAt: "Dec 18, 2024",
    closesAt: "",
    totalVotes: 0,
    responses: 0,
    owner: "policy.team@projectnexus.gov",
  },
  {
    id: "poll-4",
    title: "Urban Development Initiative 2025",
    description:
      "This poll concerns the urban development priorities for the third quarter. Results will be presented to city council.",
    question: "Which urban development priority matters most?",
    status: "closed",
    options: [
      { id: "opt-4a", label: "Public Transport Expansion", votes: 5629 },
      { id: "opt-4b", label: "Green Spaces & Parks", votes: 3997 },
      { id: "opt-4c", label: "Road Infrastructure Repair", votes: 1918 },
      { id: "opt-4d", label: "Community Centers", votes: 909 },
    ],
    createdAt: "Sep 1, 2025",
    closesAt: "Oct 15, 2025",
    totalVotes: 12453,
    responses: 12453,
  },
  {
    id: "poll-5",
    title: "Community Center Renovation Priorities",
    description:
      "The city council has approved the budget for renovating the downtown community center. We want to know which facility upgrade matters most to you.",
    question: "Which facility upgrade matters most to you?",
    status: "active",
    options: [
      { id: "opt-5a", label: "Expanded Library & Study Areas", votes: 445 },
      { id: "opt-5b", label: "New Indoor Basketball Courts", votes: 312 },
      {
        id: "opt-5c",
        label: "Modernized Kitchen & Event Space",
        votes: 289,
      },
      { id: "opt-5d", label: "Tech Hub & Makerspace", votes: 201 },
    ],
    createdAt: "Jan 10, 2025",
    closesAt: "Closes in 5 days",
    totalVotes: 1247,
    responses: 1247,
  },
  {
    id: "poll-6",
    title: "Urban Park Redevelopment Initiative",
    description:
      "The city planning committee is seeking public input on the proposed redevelopment of Central Park. Please review the options below and vote for your preferred allocation of the new budget.",
    question:
      "Which redevelopment option do you prefer for Central Park?",
    status: "active",
    options: [
      {
        id: "opt-6a",
        label: "Option A: Focus on green spaces and botanical gardens",
        votes: 523,
      },
      {
        id: "opt-6b",
        label: "Option B: Expand recreational sports facilities",
        votes: 412,
      },
      {
        id: "opt-6c",
        label: "Option C: Build a community center and library annex",
        votes: 356,
      },
      {
        id: "opt-6d",
        label: "Option D: Maintain current layout with infrastructure repairs",
        votes: 198,
      },
    ],
    createdAt: "Jan 12, 2025",
    closesAt: "Closes in 2 days",
    totalVotes: 1489,
    responses: 1489,
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: "act-1",
    user: "Priya Patel",
    avatar: "",
    action: "cast a vote in City Infrastructure Plan",
    timestamp: "2 minutes ago",
    badge: "Voted",
  },
  {
    id: "act-2",
    user: "Marcus Schmidt",
    avatar: "",
    action: "created a new poll Q3 Budget Allocation",
    timestamp: "15 minutes ago",
    badge: "Created",
  },
  {
    id: "act-3",
    user: "Sarah Okonjo",
    avatar: "",
    action: "registered a new account",
    timestamp: "42 minutes ago",
    badge: "New User",
  },
  {
    id: "act-4",
    user: "Carlos Mendez",
    avatar: "",
    action: "closed the poll Community Park Renovation",
    timestamp: "1 hour ago",
    badge: "Admin Action",
  },
  {
    id: "act-5",
    user: "Emily Chen",
    avatar: "",
    action: "updated profile settings",
    timestamp: "2 hours ago",
    badge: "Update",
  },
]

export const dashboardMetrics = {
  totalPolls: 1284,
  activePolls: 42,
  totalVotesCast: 45231,
  activeUsers: 892,
}
