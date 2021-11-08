import { PapiClient, InstalledAddon, Relation, NgComponentRelation } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';

class PageBuilderTesterService {

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

    upsertRelation(relation : NgComponentRelation): Promise<any> {
        return this.papiClient.addons.data.relations.upsert(relation);
    }

    getAddonRelations() : Promise<Relation[]>{
        return this.papiClient.addons.data.relations.find({where: `AddonUUID='${this.client.AddonUUID}'`});
    }

    createPageRelation(pageName:string, ) : NgComponentRelation {
        const namePrefix : string = "PBBT";
        const pageRelation : NgComponentRelation = {
            RelationName: "PageBlock",
            Name: `${namePrefix}_${pageName}`,
            Description: `${namePrefix}_${pageName}`,
            Type: "NgComponent",
            SubType: "NG12",
            AddonUUID: this.client.AddonUUID,
            AddonRelativeURL: "pagebuildertester",
            ComponentName: `${pageName}Component`,
            ModuleName: `${pageName}Module`,
            // EditorComponentName: `${pageName}EditorComponent`,
            // EditorModuleName: `${pageName}EditorModule`
        }
        return pageRelation;
    }
}

export default PageBuilderTesterService;