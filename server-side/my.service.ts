import { PapiClient, InstalledAddon, Relation, NgComponentRelation } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';

class pageBuilderTesterService {

    papiClient: PapiClient

    constructor(private client: Client) {
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: client.AddonUUID,
            addonSecretKey: client.AddonSecretKey,
            actionUUID: client.ActionUUID
        });
    }

    doSomething() {
        console.log("doesn't really do anything....");
    }

    getAddons(): Promise<InstalledAddon[]> {
        return this.papiClient.addons.installedAddons.find({});
    }

    // async upsertRelation(relation): Promise<any> {
    //     return await this.papiClient.post('/addons/data/relations', relation);
    // }

    upsertRelation(relation : NgComponentRelation): Promise<any> {
        return this.papiClient.addons.data.relations.upsert(relation);
    }
}

export default pageBuilderTesterService;