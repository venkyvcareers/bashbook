import { Injectable } from "@angular/core";
import { LookupValueModel, LookupItemModel } from "src/app/models/lookup-models";
import { ApiService } from "../api.service";

@Injectable()
export class LookupService {

    lookupList: LookupValueModel[];

    constructor(private apiService: ApiService) {
        this.lookupList = require('./lookupvalues.json');
    }

    getChildItems(parentId: number): LookupItemModel[] {
        let resultList: Array<LookupItemModel> = [];

        for (let index = 0; index < this.lookupList.length; index++) {
            if (this.lookupList[index].ParentId == parentId) {
                let item = new LookupItemModel();
                item.Id = this.lookupList[index].Id;
                item.Name = this.lookupList[index].Name;

                resultList.push(item);
            }
        }

        return resultList;
    }

    getChildItemId(parentId: number, childCode: string): number {

        for (let index = 0; index < this.lookupList.length; index++) {
            if (this.lookupList[index].ParentId == parentId && this.lookupList[index].Code == childCode) {
                return this.lookupList[index].Id;
            }
        }

        return 0;
    }

    getItemsByList(ids: number[], items: LookupItemModel[]): LookupItemModel[] {
        let resultList: Array<LookupItemModel> = [];

        if (!ids || ids.length == 0) {
            return resultList;
        }
        for (let index = 0; index < items.length; index++) {
            if (ids.indexOf(items[index].Id) != -1) {
                resultList.push(items[index]);
            }
        }

        return resultList;
    }

    getItemById(id: number, items: LookupItemModel[]): LookupItemModel {
        for (let index = 0; index < items.length; index++) {
            if (items[index].Id == id) {
                return items[index];
            }
        }
    }

    getOnlyIdList(items: LookupItemModel[]): number[] {
        let resultList: Array<number> = [];

        for (let index = 0; index < items.length; index++) {
            resultList.push(items[index].Id);
        }

        return resultList;
    }
}