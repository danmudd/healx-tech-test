interface IPubmedService {
  searchArticles(search: string): Promise<any>;
  getArticles(articleIds: string[]): Promise<any>;
}

export { IPubmedService };
