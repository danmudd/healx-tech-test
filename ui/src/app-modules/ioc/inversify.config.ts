import "reflect-metadata";
import { Container } from "inversify";
import { BookmarkService } from "../bookmarks/bookmark-service";
import { IBookmarkService } from "../bookmarks/bookmark-service-interface";
import { HttpService } from "../http/http-service";
import { IHttpService } from "../http/http-service-interface";
import { SERVICE_IDENTIFIERS } from "./service-identifiers";
import { IPubmedService } from "../pubmed/pubmed-service-interface";
import { PubmedService } from "../pubmed/pubmed-service";

const container = new Container({ defaultScope: "Singleton" });
container.bind<IHttpService>(SERVICE_IDENTIFIERS.IHttpService).to(HttpService);
container
  .bind<IBookmarkService>(SERVICE_IDENTIFIERS.IBookmarkService)
  .to(BookmarkService);
container
  .bind<IPubmedService>(SERVICE_IDENTIFIERS.IPubmedService)
  .to(PubmedService);

export { container };
