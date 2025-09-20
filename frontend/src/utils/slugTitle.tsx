

export function slugMangaTitle(title: string) {
    return title
        .toLocaleLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")


}