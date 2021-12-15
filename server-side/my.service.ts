import { PapiClient, InstalledAddon, Relation, NgComponentRelation, AddonDataScheme } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import { FiltersTableName } from '../global.consts'

class MyService {

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


    getAddons(): Promise<InstalledAddon[]> {
        return this.papiClient.addons.installedAddons.find({});
    }

    upsertRelation(relation : NgComponentRelation): Promise<any> {
        return this.papiClient.addons.data.relations.upsert(relation);
    }

    getAddonRelations() : Promise<Relation[]>{
        return this.papiClient.addons.data.relations.find({where: `AddonUUID='${this.client.AddonUUID}'`});
    }

    async createFiltersSchema(){
        const tableScheme : AddonDataScheme = {
            Name: FiltersTableName,
            Type: 'data',
            Fields: {
                BlockFiltersJson: {
                    Type: 'MultipleStringValues'
                }
            }
        }
        return this.papiClient.addons.data.schemes.post( tableScheme as any)
    }
}

export default MyService;