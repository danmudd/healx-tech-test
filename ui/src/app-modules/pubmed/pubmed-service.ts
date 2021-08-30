import { inject, injectable } from "inversify";
import {
  HttpMethod,
  IHttpRequest,
  IHttpService,
} from "../http/http-service-interface";
import { SERVICE_IDENTIFIERS } from "../ioc/service-identifiers";
import { IPubmedService } from "./pubmed-service-interface";

@injectable()
class PubmedService implements IPubmedService {
  constructor(
    @inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService: IHttpService
  ) {}

  public async getArticles(articleIds: string[]): Promise<void> {
    const request = this.buildPubmedRequest();

    request.baseUrl =
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi";

    Object.assign(request.params, {
      id: articleIds.join(","),
      retmax: 20,
    });

    const res = await this.httpService[HttpMethod.GET](request);

    return res.data.result;
  }

  public async searchArticles(search: string): Promise<any> {
    const request = this.buildPubmedRequest();

    request.baseUrl =
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";

    Object.assign(request.params, {
      term: search,
      retmax: 20,
    });

    const res = await this.httpService[HttpMethod.GET](request);

    return res.data.esearchresult;
  }

  private buildPubmedRequest(): IHttpRequest {
    return {
      url: "",
      params: {
        db: "pubmed",
        retmode: "json",
      },
    };
  }
}

export { PubmedService };
