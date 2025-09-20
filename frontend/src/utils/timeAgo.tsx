

export function timeAgo(input: string): string {
    // If input already contains "ago", return it as-is
    if (input.includes("ago")) return input;

    // Otherwise, treat it as ISO string
    const now = new Date();
    const past = new Date(input);
    const diffMs = now.getTime() - past.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
}
