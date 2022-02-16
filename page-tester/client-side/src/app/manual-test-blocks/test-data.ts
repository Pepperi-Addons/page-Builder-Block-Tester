import { IBlockFilterParameter, IBlockStringParameter } from 'src/models/page-block.model';

export const stringTestParam: IBlockStringParameter = {
    Key: "StringKey",
    Type: "String",
    Consume: true,
    Produce: true
};

export const filterTestParam: IBlockFilterParameter = {
    Key: "FilterKey",
    Type: "Filter",
    Consume: true,
    Produce: true,
    Resource: 'accounts',
    Fields: ['x'],
};