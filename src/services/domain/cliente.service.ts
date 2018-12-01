import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx"
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: string) : Observable<ClienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeder = new HttpHeaders({'Authorization':'Bearer '+token});

        return this.http
            .get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers': authHeder});
    }

    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }

}