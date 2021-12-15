import { Client, Request } from "@pepperi-addons/debug-server/dist";
import { AddonData, PapiClient } from "@pepperi-addons/papi-sdk";

const TABLE_NAME = "JsonFilter";

export class BlockFiltersService{

	private papiClient : PapiClient
	

	constructor(private client : Client){
		this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client.ActionUUID
        });
	}

    async upsert(request: Request) : Promise<AddonData>{
        const body = request.body;
        const addonData : AddonData = {
            Key: this.getBlockKey(body),
            BlockFiltersJson: body.BlockFiltersJson
        };

        return this.papiClient.addons.data.uuid(this.client.AddonUUID).table(TABLE_NAME).upsert(addonData); 
    }

    async get(request : Request) : Promise<AddonData>{
        const body = request.body;
        const key : string = this.getBlockKey(body);
        return this.papiClient.addons.data.uuid(this.client.AddonUUID).table(TABLE_NAME).key(key).get();
	}

    getBlockKey(body : any) :  string{
        const key : string = body?.Key ?? body?.key;
        if(!key){
            throw new Error("Key not defined");
        }
        else{
            return key;
        }
    }

}