export class CreateListItemInputType{
    item_details : string;
    list_id : number;
}

export class DeleteListItemInputType{
    id : number;
}

export class UpdateListItemInputType{
    id : number;
    item_details : string;
    is_completed : boolean;
}